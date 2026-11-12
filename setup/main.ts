import { defineAppSetup } from 'valaxy'

export default defineAppSetup(async ({ isClient }) => {
  if (!isClient)
    return

  // 必须先加载 Cubism 运行时，再导入依赖它的模型模块。
  await import('valaxy-addon-live2d/lib/index.js')
  const { Live2DApp } = await import('valaxy-addon-live2d/app/Live2DApp.js')
  type Model = Parameters<typeof Live2DApp.mount>[0]

  function configureEmma(model?: Model) {
    if (model?.internalModel.settings.name !== 'Emma')
      return

    // 原模型通过这些输入驱动物理系统；直接写标准头部参数会被物理输出覆盖。
    Object.assign(model.internalModel, {
      idParamAngleX: 'Param85',
      idParamAngleY: 'Param86',
      idParamAngleZ: 'Param87',
    })
    model.automator.autoFocus = false
  }

  function updateModelLayout(model?: Model) {
    const viewer = document.getElementById('live2d')
    if (!viewer || !model)
      return

    viewer.dataset.model = model.internalModel.settings.name
    viewer.style.setProperty('--live2d-canvas-height', `${Live2DApp.pixiApp.renderer.screen.height}px`)
  }

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
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('blur', resetFocus)

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('blur', resetFocus)
      Live2DApp.mount = originalMount
    })
  }
})
