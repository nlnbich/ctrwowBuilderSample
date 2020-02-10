import './styles.css';

const advancedSectors = {
    'paragraph': ['line-height', 'text-shadow'],
};

export default (editor) => {
    editor.on("load", () => {
        Object.entries(advancedSectors).forEach(([sector, properties]) => {
            const $sector = document.querySelector(`#gjs-sm-${sector}`);

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
            $action.innerHTML = `<i class="fa fa-cogs act-adv" title="Advanced"></i>`;

            // inject click event
            const $advanced = $action.querySelector('.act-adv');
            $advanced.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                properties.forEach((property) => {
                    const $property = $properties.querySelector(`#gjs-sm-${property}`);
                    $property.classList.toggle('act-none');
                });
            });

            $title.appendChild($action);
        })
    });
};