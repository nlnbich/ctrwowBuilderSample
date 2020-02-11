import grapesjs from 'grapesjs'
import basicBlocks from 'grapesjs-blocks-basic'
import loadTraits from './traits'
import 'grapesjs/dist/css/grapes.min.css'
import './styles.css'

// Plugins
//import Collection from "./plugins/Collection";
import actionLoader from './sectors/actionLoader';

import sectors from './sectors'

var editor = grapesjs.init({
  container: '#app',
  fromElement: true,
  dragMode: 'translate',
  styleManager: {
    clearProperties: 1,
    sectors: sectors
  },
  plugins: [basicBlocks]
})

actionLoader(editor);

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
  var openTmBtn = pn.getButton('views', 'open-tm')
  var openBlocksBtn = pn.getButton('views', 'open-blocks')
  openTmBtn && openTmBtn.set('active', 1)
  openBlocksBtn && openBlocksBtn.set('active', 1)
}

editor.on('load', function() {
  loadTraits(editor)
  moveTraitToSector('gjs-clm-tags', 'gjs-sm-element_metadata')
  setupPanels(editor)
})

editor.on('component:selected', function(model) {
  const componentType = model.get('type')
  const styleManager = editor.StyleManager
  const pfx = styleManager.getConfig().stylePrefix
  switch (componentType) {
    case 'text':
      hideSectors(pfx, ['click-actions'])
      showSectors(pfx, ['font', 'paragraph'])
      break
    case 'link':
      model.set('editable', false);
      !model.getTrait("text") && model.get('traits').add({ name: "text", type: 'content', label: 'Content' });
      hideSectors(pfx, ['paragraph'])
      showSectors(pfx, ['font','click-actions'])
      moveTraitToSector('gjs-trt-traits', 'gjs-sm-click-actions')
      break
    default:
      hideSectors(pfx, ['font', 'paragraph', 'click-actions'])
      break
  }
  model.set('resizable', true)
})
