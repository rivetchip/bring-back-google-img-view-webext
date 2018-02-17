'use strict';
//"run_at": "document_idle",

var buttonId = 'button-google-view-image-'+(Math.random().toString(36).substr(2, 10));
var isClickEventOnParent = false; // once the popup is loaded

// all pictures block container
var imagesContainer = document.querySelector('#rg_s');

// main blocks ; click event
delegate(imagesContainer, 'a.rg_l, img.rg_ic', 'click', onImmersiveContainerAction);

// from the /imgres direct page
onImmersiveContainerAction();



function onImmersiveContainerAction( event ) {
    // var target = event ? event.target : null;
    var immersiveContainers;

    setTimeout(function(){

        // over top panels (3)
        immersiveContainers = document.querySelectorAll('#irc_bg .immersive-container');

        for( var immersiveContainer of immersiveContainers ) {

            var imagePanel = immersiveContainer.querySelector('.irc_mi'); // preview image
            var descPanel = immersiveContainer.querySelector('.irc_mmc table.irc_but_r tr td'); // website desc & url

            if( imagePanel && descPanel ) {
                var button = createButtonFrom(immersiveContainer, imagePanel);
                
                descPanel.insertBefore(button, descPanel.firstChild);
            }
        }

        // add click event on parent ; aka for similar pictures :

        if( !isClickEventOnParent ) {

            // black popup container of immersives
            var immersiveContainerParent = document.querySelector('#irc_bg');

            // similares pictures ; click event
            delegate(immersiveContainerParent, 'a.rg_l, img.target_image, img.irc_rii', 'click', onImmersiveContainerAction);


            isClickEventOnParent = true;
        }

    }, 500);//1s ; wait for the click & animation TODO: make a cleaner version...
}

function createButtonFrom( immersiveContainer, imagePanel ) {

    var button = immersiveContainer.querySelector('.'+buttonId);

    if( !button ) {
        var button = document.createElement('a');
        button.className = buttonId;

        button.innerText = '(i) View Image';
        
        button.setAttribute('role', 'button');

        button.setAttribute('style', 
            'background-color: #454545;'+
            'color: #aaa;'+
            'padding: 5px 10px;'+
            'border: 1px solid #141414;'
        );
    }

    button.setAttribute('href', imagePanel.getAttribute('src'));

    return button;
}

function delegate( parent, target, eventType, callback ) {    
    parent && parent.addEventListener(eventType, function( event ) {
        var element = event.target;
        var matchesCallback = element.matches || element.matchesSelector;

        // console.log(element)

        if( (matchesCallback).call(element, target) ) {
            callback.call(element, event);
        }
    });
}

