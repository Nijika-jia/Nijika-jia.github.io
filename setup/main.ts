import type { Cubism4InternalModel } from 'pixi-live2d-display'
import { defineAppSetup } from 'valaxy'

export default defineAppSetup(async ({ isClient }) => {
  if (!isClient)
    return

  // 必须先加载 Cubism 运行时，再导入依赖它的模型模块。
  await import('valaxy-addon-live2d/lib/index.js')
  const { Live2DApp } = await import('valaxy-addon-live2d/app/Live2DApp.js')
  type Model = Parameters<typeof Live2DApp.mount>[0]
  const configuredModels = new WeakSet<Model>()
  const cleanups: (() => void)[] = []

  function configureEmma(model?: Model) {
    if (model?.internalModel.settings.name !== 'Emma' || configuredModels.has(model))
      return

    configuredModels.add(model)
    const internal = model.internalModel as Cubism4InternalModel
    // 原模型通过这些输入驱动物理系统；直接写标准头部参数会被物理输出覆盖。
    internal.idParamAngleX = 'Param85'
    internal.idParamAngleY = 'Param86'
    internal.idParamAngleZ = 'Param87'
    model.automator.autoFocus = false

    // 循环待机动作会跳过运行时默认的眨眼，补在动作之后、表情和物理之前。
    const blinkDuringIdle = () => {
      const manager = internal.motionManager
      if (manager.state.currentGroup === manager.groups.idle && !manager.isFinished())
        internal.eyeBlink?.updateParameters(internal.coreModel, model.deltaTime / 1000)
    }
    internal.on('afterMotionUpdate', blinkDuringIdle)
    if (import.meta.hot)
      cleanups.push(() => internal.off('afterMotionUpdate', blinkDuringIdle))
  }

  function updateModelLayout(model?: Model) {
    const viewer = document.getElementById('live2d')
    if (!viewer || !model)
      return

    viewer.dataset.model = model.internalModel.settings.name
    viewer.style.setProperty('--live2d-canvas-height', `${Live2DApp.pixiApp.renderer.screen.height}px`)

    // 艾玛只有一套外观，隐藏没有意义的换装按钮；Tia/Pio 仍保留。
    const skinTool = document.getElementById('live2d-tool-switch-texture')
    if (skinTool)
      skinTool.style.display = model.internalModel.settings.name === 'Emma' ? 'none' : ''
  }

  // 把插件默认的通用提示替换成艾玛的台词。
  const emmaMouseover: Record<string, string[]> = {
    '#live2d-canvas': [
      'ボク、桜羽エマ。よろしくね。',
      '魔女什么的不可怕！只要大家齐心协力总会有办法的！',
      '我要和大家一起，从这个牢屋宅邸逃出去！',
      '我只是想守护大家……有什么错呢？',
      '誰も死なせない。',
      'ビンを炙ったら炙りビンになるよ！',
      'ココちゃん、一人で大騒ぎしてる……！',
      '大家要一起吃饭、一起行动才行！',
      '我才没有被讨厌，对吧？',
      '……所有人都去死就好了。',
    ],
    '#live2d-tool-switch-model': [
      '要换成别的魔女吗？不过，还是留在我身边吧。',
      '换一个人……你会不会就不喜欢我了？',
    ],
    '#live2d-tool-switch-texture': [
      '换衣服？我也想和大家一样打扮得漂漂亮亮的。',
      '这件好看吗？……真的？',
    ],
    '#live2d-tool-hitokoto': [
      '一句话？那我说：今天也要好好活下去。',
      '想听我说什么？……我其实不太会说话。',
    ],
    '#live2d-tool-photo': [
      '拍照？……笑一下，对吧。',
      '要拍好看一点哦，我还想给大家看。',
    ],
    '#live2d-tool-info': [
      '想知道我的事？囚犯编号 658，桜羽エマ。',
      '这里记录着我来到这里之前的事。',
    ],
    '#live2d-tool-quit': [
      '要走了吗……别丢下我一个人。',
      '我们还能再见面吧？',
    ],
  }

  const emmaClick = [
    '诶？要摸摸头吗？',
    'ボクはここにいるよ。',
    '别突然碰我啦……不过，谢谢。',
    '要一起逃出去吗？',
    '再摸的话，我可要生气了哦。',
  ]

  const emmaTime: Record<string, string[]> = {
    '6-7': ['早上好！今天也要一起努力哦！'],
    '8-11': ['上午好！大家都有好好吃早饭吗？'],
    '12-13': ['中午了！一起吃饭吧，人多才热闹！'],
    '14-17': ['午后好困……要不要聊点什么提提神？'],
    '18-19': ['傍晚了，夕阳很美呢。'],
    '20-21': ['晚上好！今天过得怎么样？'],
    '22-23': ['已经很晚了，早点休息吧。晚安！', '深夜要爱护眼睛呀。'],
    '0-5': ['还没睡吗？……我陪着你。'],
  }

  const tipsTimer = setInterval(() => {
    const tips = (Live2DApp as any).live2dTips
    if (!tips)
      return

    for (const tip of tips.mouseover ?? []) {
      if (emmaMouseover[tip.selector])
        tip.text = emmaMouseover[tip.selector]
    }
    for (const tip of tips.click ?? []) {
      if (tip.selector === '#live2d')
        tip.text = emmaClick
    }
    for (const tip of tips.time ?? []) {
      if (emmaTime[tip.hour])
        tip.text = emmaTime[tip.hour]
    }
    clearInterval(tipsTimer)
  }, 300)
  cleanups.push(() => clearInterval(tipsTimer))

  const originalMount = Live2DApp.mount
  Live2DApp.mount = function (model) {
    configureEmma(model)
    originalMount.call(this, model)
    updateModelLayout(model)
  }
  configureEmma(Live2DApp.model?.live2dModel)
  updateModelLayout(Live2DApp.model?.live2dModel)

  const onPointerMove = (event: PointerEvent) => {
    const model = Live2DApp.model?.live2dModel
    if (event.pointerType === 'touch' || model?.internalModel.settings.name !== 'Emma' || !model.parent)
      return

    const canvas = document.getElementById('live2d-canvas')
    if (!canvas)
      return

    // 艾玛的头部中心约位于完整画布高度的 21%，按实际缩放后的坐标计算视线。
    const rect = canvas.getBoundingClientRect()
    const headX = rect.left + rect.width * 0.5
    const headY = rect.top + rect.height * 0.21
    const x = (event.clientX - headX) / Math.max(rect.width * 0.8, 1)
    const y = (headY - event.clientY) / Math.max(rect.height * 0.4, 1)
    model.internalModel.focusController.focus(x, y)
  }

  const resetFocus = () => {
    const model = Live2DApp.model?.live2dModel
    if (model?.internalModel.settings.name === 'Emma')
      model.internalModel.focusController.focus(0, 0)
  }
  const onVisibilityChange = () => {
    if (document.hidden)
      resetFocus()
  }
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('blur', resetFocus)
  document.documentElement.addEventListener('pointerleave', resetFocus)
  document.addEventListener('visibilitychange', onVisibilityChange)

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('blur', resetFocus)
      document.documentElement.removeEventListener('pointerleave', resetFocus)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      cleanups.forEach(cleanup => cleanup())
      Live2DApp.mount = originalMount
    })
  }
})
