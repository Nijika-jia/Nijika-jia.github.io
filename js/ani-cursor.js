/**
 * ani-cursor.js - 自包含的 Windows .ani 动画光标解析器与应用
 * 无需任何外部依赖，直接在浏览器中解析 .ani 文件并生成 CSS 动画光标
 * 参考: https://github.com/captbaritone/ani-cursor
 */
(function () {
  'use strict';

  const JIFFIES_PER_MS = 1000 / 60;
  let _animId = 0;

  // ============================================================
  // RIFF/ACON 解析器
  // ============================================================

  function readUint32LE(arr, offset) {
    return (
      (arr[offset] |
        (arr[offset + 1] << 8) |
        (arr[offset + 2] << 16) |
        ((arr[offset + 3] << 24) >>> 0)) >>>
      0
    );
  }

  function readString(arr, offset, len) {
    let s = '';
    for (let i = 0; i < len; i++) s += String.fromCharCode(arr[offset + i]);
    return s;
  }

  /**
   * 解析 RIFF 块结构
   */
  function parseRiffChunks(arr, start, end) {
    const chunks = [];
    let pos = start;
    while (pos + 8 <= end) {
      const id = readString(arr, pos, 4);
      const size = readUint32LE(arr, pos + 4);
      const dataStart = pos + 8;
      const dataEnd = Math.min(dataStart + size, end);

      const chunk = { id, size, dataStart, dataEnd, subChunks: [] };

      // LIST 块包含子块
      if (id === 'LIST' && dataStart + 4 <= dataEnd) {
        chunk.format = readString(arr, dataStart, 4);
        chunk.subChunks = parseRiffChunks(arr, dataStart + 4, dataEnd);
      }

      chunks.push(chunk);
      // RIFF 块按 2 字节对齐
      pos = dataEnd + (size % 2);
    }
    return chunks;
  }

  /**
   * 解析 .ani 文件二进制数据
   */
  function parseAni(arr) {
    // 验证 RIFF 头
    const riffId = readString(arr, 0, 4);
    if (riffId !== 'RIFF') throw new Error('不是有效的 RIFF 文件');

    const format = readString(arr, 8, 4);
    if (format !== 'ACON') throw new Error('不是 ACON (动画光标) 文件');

    const allChunks = parseRiffChunks(arr, 12, arr.length);

    // 查找 anih 元数据块
    let metadata = null;
    let rate = null;
    let seq = null;
    let images = [];
    let title = null;
    let artist = null;

    function findChunk(chunks, id) {
      return chunks.find(function (c) { return c.id === id; });
    }

    function findAllChunks(chunks, id) {
      return chunks.filter(function (c) { return c.id === id; });
    }

    // 解析 anih 头
    var anih = findChunk(allChunks, 'anih');
    if (anih) {
      var s = anih.dataStart;
      metadata = {
        cbSize: readUint32LE(arr, s),
        nFrames: readUint32LE(arr, s + 4),
        nSteps: readUint32LE(arr, s + 8),
        iWidth: readUint32LE(arr, s + 12),
        iHeight: readUint32LE(arr, s + 16),
        iBitCount: readUint32LE(arr, s + 20),
        nPlanes: readUint32LE(arr, s + 24),
        iDispRate: readUint32LE(arr, s + 28),
        bfAttributes: readUint32LE(arr, s + 32),
      };
    }

    if (!metadata) throw new Error('未找到 anih 元数据');

    // 解析 rate 块（每帧显示时长）
    var rateChunk = findChunk(allChunks, 'rate');
    if (rateChunk) {
      rate = [];
      for (var i = 0; i < metadata.nFrames; i++) {
        rate.push(readUint32LE(arr, rateChunk.dataStart + i * 4));
      }
    }

    // 解析 seq 块（帧序列顺序）
    var seqChunk = findChunk(allChunks, 'seq ');
    if (seqChunk) {
      seq = [];
      for (var i = 0; i < metadata.nSteps; i++) {
        seq.push(readUint32LE(arr, seqChunk.dataStart + i * 4));
      }
    }

    // 从 LIST/fram 中提取图标帧
    var lists = findAllChunks(allChunks, 'LIST');
    var framList = lists.find(function (l) { return l.format === 'fram'; });
    if (framList) {
      images = framList.subChunks
        .slice(0, metadata.nFrames)
        .map(function (c) {
          return arr.slice(c.dataStart, c.dataEnd);
        });
    }

    // 从 LIST/INFO 提取标题和作者
    var infoList = lists.find(function (l) { return l.format === 'INFO'; });
    if (infoList) {
      infoList.subChunks.forEach(function (c) {
        if (c.id === 'INAM') {
          title = readString(arr, c.dataStart, c.dataEnd - c.dataStart);
        } else if (c.id === 'IART') {
          artist = readString(arr, c.dataStart, c.dataEnd - c.dataStart);
        } else if (c.id === 'LIST' && c.format === 'fram') {
          // 某些文件帧数据在 INFO 列表里
          images = c.subChunks
            .slice(0, metadata.nFrames)
            .map(function (sc) {
              return arr.slice(sc.dataStart, sc.dataEnd);
            });
        }
      });
    }

    return {
      metadata: metadata,
      rate: rate,
      seq: seq,
      images: images,
      title: title,
      artist: artist,
    };
  }

  // ============================================================
  // 工具函数
  // ============================================================

  function uint8ArrayToBase64(arr) {
    var binary = '';
    var chunkSize = 8192;
    for (var i = 0; i < arr.length; i += chunkSize) {
      var chunk = arr.subarray(i, Math.min(i + chunkSize, arr.length));
      binary += String.fromCharCode.apply(null, chunk);
    }
    return btoa(binary);
  }

  function sum(arr) {
    return arr.reduce(function (a, b) { return a + b; }, 0);
  }

  // ============================================================
  // 核心：将 .ani 二进制数据转换为 CSS
  // ============================================================

  function convertAniBinaryToCSS(selector, aniBinary, suffix) {
    var ani = parseAni(aniBinary);
    var rate =
      ani.rate ||
      ani.images.map(function () { return ani.metadata.iDispRate; });
    var duration = sum(rate);

    var animName = 'ani-cursor-' + _animId++;

    // 构建每帧的 keyframe 数据
    var frames = ani.images.map(function (image) {
      var base64 = uint8ArrayToBase64(image);
      return {
        url: 'data:image/x-win-bitmap;base64,' + base64,
        percents: [],
      };
    });

    var elapsed = 0;
    rate.forEach(function (r, i) {
      var frameIdx = ani.seq ? ani.seq[i] : i;
      if (frames[frameIdx]) {
        frames[frameIdx].percents.push((elapsed / duration) * 100);
      }
      elapsed += r;
    });

    var keyframes = frames
      .filter(function (f) { return f.percents.length > 0; })
      .map(function (f) {
        var pct = f.percents
          .map(function (p) { return p.toFixed(4) + '%'; })
          .join(', ');
        return pct + ' { cursor: url(' + f.url + '), auto; }';
      });

    // step-end 使离散属性（cursor）在关键帧之间切换
    var timingFunction = 'step-end';
    // suffix 为选择器后缀，如 ':hover' 或 ':hover,:active'，空字符串表示无后缀
    // 将每个选择器都加上所有后缀变体
    var fullSelector;
    if (suffix) {
      var selectors = selector.split(',').map(function (s) { return s.trim(); });
      var suffixes = suffix.split(',').map(function (s) { return s.trim(); });
      var allCombinations = [];
      selectors.forEach(function (sel) {
        suffixes.forEach(function (suf) {
          allCombinations.push(sel + suf);
        });
      });
      fullSelector = allCombinations.join(', ');
    } else {
      fullSelector = selector;
    }
    var durationMs = Math.round(duration * JIFFIES_PER_MS);

    var css =
      '@keyframes ' + animName + ' {\n' +
      '  ' + keyframes.join('\n  ') + '\n' +
      '}\n' +
      fullSelector + ' {\n' +
      '  animation: ' + animName + ' ' + durationMs + 'ms ' + timingFunction + ' infinite;\n' +
      '}\n';

    return css;
  }

  // ============================================================
  // 加载并应用光标
  // ============================================================

  /**
   * 从 URL 加载 .ani 文件并应用为 CSS 动画光标
   * @param {string} selector - CSS 选择器
   * @param {string} aniUrl - .ani 文件路径
   * @param {string} suffix - 选择器后缀，如 ':hover' 或 ':hover,:active'，空字符串表示无后缀
   */
  function applyAniCursor(selector, aniUrl, suffix) {
    return fetch(aniUrl)
      .then(function (res) {
        if (!res.ok) throw new Error('无法加载: ' + aniUrl);
        return res.arrayBuffer();
      })
      .then(function (buf) {
        var data = new Uint8Array(buf);
        var css = convertAniBinaryToCSS(selector, data, suffix);
        var style = document.createElement('style');
        style.setAttribute('data-ani-cursor', aniUrl);
        style.textContent = css;
        document.head.appendChild(style);
      })
      .catch(function (err) {
        console.warn('[ani-cursor] 加载失败:', aniUrl, err);
      });
  }

  // ============================================================
  // 自动初始化：配置光标映射
  // ============================================================

  var CURSOR_BASE = '/cursor/';

  var CURSOR_MAP = [
    // Normal 光标：全局 body，始终生效
    {
      selector: 'body',
      file: 'Normal.ani',
      suffix: '',
    },
    // Link 光标：链接和按钮，hover 时生效
    {
      selector: 'a, button, [role="button"], .cursor-pointer, label, .vp-link, .nav-link, .yun-icon-btn, .yun-post-card, .yun-menu-item',
      file: 'Link.ani',
      suffix: ':hover',
    },
    // Text 光标：输入框和可编辑文本，hover 和 active（文本选择拖拽）时均生效
    {
      selector: 'input, textarea, [contenteditable], [contenteditable="true"]',
      file: 'Text.ani',
      suffix: ':hover,:active',
    },
    // Working 光标：加载状态（如有 loading 类）
    {
      selector: '.loading, .is-loading, .yun-loading',
      file: 'Working.ani',
      suffix: '',
    },
  ];

  function init() {
    var promises = CURSOR_MAP.map(function (cfg) {
      return applyAniCursor(cfg.selector, CURSOR_BASE + cfg.file, cfg.suffix);
    });

    Promise.all(promises)
      .then(function () {
        console.log('[ani-cursor] 所有动画光标已加载完成');
      })
      .catch(function (err) {
        console.warn('[ani-cursor] 部分光标加载失败:', err);
      });
  }

  // DOM 就绪后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
