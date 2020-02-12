const styleManagerUtils = (function() {

  const sectors = ['font', 'paragraph', 'click-actions']
  const advancedSectors = {
    'paragraph': ['line-height', 'text-shadow'],
    'geometry': ['right', 'bottom', 'display', 'position', 'float', 'max-width', 'min-height', 'margin', 'padding'],
    'flex': ['order', 'flex'],
  };
  let editor = null

  function moveTraitToSector(traitCls, sectorCls) {
    const trait = document.querySelector(`.${traitCls}`)
    const sector = document.getElementById(sectorCls)
    trait.classList.add('gjs-sm-property')
    trait.classList.add('gjs-sm-stack')
    sector && sector.querySelector('.gjs-sm-properties').appendChild(trait)
  }

  function hideSectors(pfx, sectors) {
    sectors.forEach(sector => {
      document.getElementById(`${pfx}${sector}`).classList.add('disable')
    })
  }

  function showSectors(pfx, sectors) {
    sectors.forEach(sector => {
      document.getElementById(`${pfx}${sector}`).classList.remove('disable')
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
    !model.getTrait('text') && model.get('traits').add({ name: 'text', type: 'content', label: 'Content' })
    hideSectors(pfx, ['paragraph'])
    showSectors(pfx, ['font', 'click-actions'])
    moveTraitToSector('gjs-trt-traits', 'gjs-sm-click-actions')
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
  }

  function actionLoader(){
    Object.entries(advancedSectors).forEach(([sector, properties]) => {
      const $sector = document.querySelector(`#gjs-sm-${sector}`);
      if(!$sector) return
      // hide all advanced properties
      const $properties = $sector.querySelector(`.gjs-sm-properties`);
      properties.forEach((property) => {
        const $property = $properties.querySelector(`#gjs-sm-${property}`);
        $property.classList.add('act-none');
      });

      // Add advanced button
      const $title = $sector.querySelector(`.gjs-sm-title`);
      const $action = document.createElement('div');
      $action.classList.add('act-group');
      $action.innerHTML = `<i class="fa fa-cogs act-adv" title="Advanced Options"></i>`;

      // inject click event
      const $advanced = $action.querySelector('.act-adv');
      $advanced.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        $advanced.classList.toggle('act-active');
        properties.forEach((property) => {
          const $property = $properties.querySelector(`#gjs-sm-${property}`);
          $property.classList.toggle('act-none');
        });
      });

      $title.appendChild($action);
    })
  }

  function initSectors(sectors) {
    const sm = editor.StyleManager
    const currentSectors = sm.getSectors()
    currentSectors.reset()
    currentSectors.add(sectors)
    moveTraitToSector('gjs-clm-tags', 'gjs-sm-element_metadata')
    actionLoader()
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
