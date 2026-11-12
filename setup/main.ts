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
