const styleManagerUtils = (function() {

  const sectors = ['font', 'paragraph', 'click-actions']
  let editor = null

  function moveTraitToSector(traitCls, sectorCls) {
    const trait = document.querySelector(`.${traitCls}`)
    const sector = document.getElementById(sectorCls)
    if(!trait) return
    trait.classList.add('gjs-sm-property')
    trait.classList.add('gjs-sm-stack')
    sector && sector.querySelector('.gjs-sm-properties').appendChild(trait)
  }

  function hideSectors(pfx, sectors) {
    sectors.forEach(sector => {
      const $sector = document.getElementById(`${pfx}${sector}`);
      $sector && $sector.classList.add('disable')
    })
  }

  function showSectors(pfx, sectors) {
    sectors.forEach(sector => {
      const $sector = document.getElementById(`${pfx}${sector}`);
      $sector && $sector.classList.remove('disable')
    })
  }

  function setupPanels(editor) {
    const pn = editor.Panels
    const openTmBtn = pn.getButton('views', 'open-tm')
    const openBlocksBtn = pn.getButton('views', 'open-blocks')
    openTmBtn && openTmBtn.set('active', 1)
    openBlocksBtn && openBlocksBtn.set('active', 1)
  }

  function handleTextComponent(styleManager) {
    const pfx = styleManager.getConfig().stylePrefix
    hideSectors(pfx, ['click-actions'])
    showSectors(pfx, ['font', 'paragraph'])
  }

  function handleLinkComponent(model, styleManager) {
    const pfx = styleManager.getConfig().stylePrefix
    model.set('editable', false)
    !model.getTrait('text') && model.get('traits').add({ name: 'text', type: 'content-textarea', label: 'Content' })
    hideSectors(pfx, ['paragraph'])
    showSectors(pfx, ['font', 'click-actions'])
    //moveTraitToSector('gjs-trt-traits', 'gjs-sm-click-actions')
  }

  function componentSwitcher(model) {
    const componentType = model.get('type')
    const styleManager = editor.StyleManager
    const pfx = styleManager.getConfig().stylePrefix
    switch (componentType) {
      case 'text':
        handleTextComponent(styleManager)
        break
      case 'link':
        handleLinkComponent(model, styleManager)
        break
      default:
        hideSectors(pfx, sectors)
        break
    }
    moveTraitToSector('gjs-clm-tags', 'gjs-sm-element_metadata')
  }

  function initSectors(sectors) {
    const sm = editor.StyleManager
    const currentSectors = sm.getSectors()
    if(currentSectors.length > 0) return
    currentSectors.reset()
    currentSectors.add(sectors)
  }

  function initStyleManagerPanel(e) {
    editor = e
    setupPanels(editor)
  }

  return {
    initStyleManagerPanel: initStyleManagerPanel,
    initSectors: initSectors,
    moveTraitToSector: moveTraitToSector,
    componentSwitcher: componentSwitcher
  }
})()

export default styleManagerUtils
