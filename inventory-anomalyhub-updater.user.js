// ==UserScript==
// @name         Anomaly Update Ingress Inventory
// @id           guschtel@inventory-update
// @description  Update inventory script
// @author       Guschtel
// @namespace    http://tampermonkey.net/
// @version      0.7
// @match        https://*.willbe.blue/inventory/update
// @icon         https://www.google.com/s2/favicons?sz=64&domain=willbe.blue
// @grant        none
// ==/UserScript==

function to_number(val) {
    if (val == null || val == undefined) {
        return 0;
    }
    return +(val.toString().replace(/\r/g, ''));
}

function getOtherBeacons(inventory) {
    var sum = 0;
    for (const [key, value] of Object.entries(inventory)) {
        if (key.startsWith("Powerup") && !key.startsWith("Powerup BB_BATTLE_RARE")) {
            sum += +value;
        }
    }
    return sum;
}

function setFormValue(formKey, formValue) {
    const elements = document.getElementsByName(formKey);
    if (elements != undefined && elements.length > 0) {
        elements[0].value = formValue;
    }
}

(function() {
    'use strict';

    // Your code here...
    console.log('Running script! -------------------------------------');
    var updateBtn = document.getElementsByClassName("btn btn-primary")[0];
    let copyCPbtn = document.createElement("button");
    copyCPbtn.innerHTML = "Copy from Clipboard";
    copyCPbtn.className = "btn btn-primary";
    copyCPbtn.style = "margin-left: 1em;";
    copyCPbtn.onclick = function () {
        navigator.clipboard.readText()
            .then(text => {
            console.log('Pasted content: ', text);
            if (text.includes('Type	Rarity	Count')) {
                var lines = text.split("\n");
                var inventory = {};
                for(var line = 1; line < lines.length; line++){
                    // By tabs
                    var tabs = lines[line].split("\t");
                    if (tabs[0] == "Shield" || tabs[0] == "HS" || tabs[0] == "Multi-Hack") {
                        inventory[tabs[0] + " " + tabs[1]] = tabs[2];
                    } else {
                        inventory[tabs[0]] = tabs[2];
                    }
                }
                console.log('Inventory: ', inventory);

                setFormValue("inventory[X8]", to_number(inventory["XMP 8"]));
                setFormValue("inventory[U8]", to_number(inventory["US 8"]));
                setFormValue("inventory[JARVIS]", to_number(inventory["Virus JARVIS"]));
                setFormValue("inventory[ADA]", to_number(inventory["Virus ADA"]));
                setFormValue("inventory[R8]", to_number(inventory["Resonator 8"]));
                setFormValue("inventory[R7]", to_number(inventory["Resonator 7"]));
                setFormValue("inventory[R6]", to_number(inventory["Resonator 6"]));
                setFormValue("inventory[R5]", to_number(inventory["Resonator 5"]));
                setFormValue("inventory[R4]", to_number(inventory["Resonator 4"]));
                setFormValue("inventory[Aegis]", to_number(inventory["Aegis Shield"]));
                setFormValue("inventory[VR Shields]", to_number(inventory["Shield VERY_RARE"]));
                setFormValue("inventory[C8]", to_number(inventory["PC 8"]));
                setFormValue("inventory[Hypercubes]", to_number(inventory["Hypercube"]));
                setFormValue("inventory[LPC]", to_number(inventory["Hypercube"]));
                setFormValue("inventory[VR Battle Beacons]", to_number(inventory["Powerup BB_BATTLE"]));
                setFormValue("inventory[Other Beacons]", to_number(getOtherBeacons(inventory)));
                setFormValue("inventory[VRHS]", to_number(inventory["HS VERY_RARE"]));
                setFormValue("inventory[VRMH]", to_number(inventory["Multi-Hack VERY_RARE"]));
                setFormValue("inventory[SBUL]", to_number(inventory["Ultra-Link"]));
                setFormValue("inventory[FRK]", to_number(inventory["Powerup FRACK"]));
                setFormValue("inventory[Caps]", to_number(inventory["Capsule"]));
                var utc = new Date().toJSON();
                var commentElement = document.getElementsByName("inventory[_notes]")[0];
                if (!commentElement.value.includes("Inventory automatically filled with Guschtels Inventory userscripts")) {
                    commentElement.value += "\nInventory automatically filled with Guschtels Inventory userscripts (https://github.com/Guschtel/public-iitc-scripts/tree/main) on " + utc;
                } else {
                    const regex = /on [0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.*Z/i;
                    commentElement.value = commentElement.value.replace(regex, 'on ' + utc);
                }
            } else {
                console.error('Invalid clipboard content');
            }
        })
            .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
        return false;
    };
    updateBtn.parentNode.insertBefore(copyCPbtn, updateBtn.nextSibling);
})();
