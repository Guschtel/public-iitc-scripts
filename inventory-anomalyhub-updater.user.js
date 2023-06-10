// ==UserScript==
// @name         Anomaly Update Ingress Inventory
// @id           guschtel@inventory-update
// @description  Update inventory script
// @author       Guschtel
// @namespace    http://tampermonkey.net/
// @version      0.6
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

                document.getElementsByName("inventory[X8]")[0].value = to_number(inventory["XMP 8"]);
                document.getElementsByName("inventory[U8]")[0].value = to_number(inventory["US 8"]);
                document.getElementsByName("inventory[JARVIS]")[0].value = to_number(inventory["Virus JARVIS"]);
                document.getElementsByName("inventory[ADA]")[0].value = to_number(inventory["Virus ADA"]);
                document.getElementsByName("inventory[R8]")[0].value = to_number(inventory["Resonator 8"]);
                document.getElementsByName("inventory[R7]")[0].value = to_number(inventory["Resonator 7"]);
                document.getElementsByName("inventory[R6]")[0].value = to_number(inventory["Resonator 6"]);
                document.getElementsByName("inventory[R5]")[0].value = to_number(inventory["Resonator 5"]);
                document.getElementsByName("inventory[R4]")[0].value = to_number(inventory["Resonator 4"]);
                document.getElementsByName("inventory[Aegis]")[0].value = to_number(inventory["Aegis Shield"]);
                document.getElementsByName("inventory[VR Shields]")[0].value = to_number(inventory["Shield VERY_RARE"]);
                document.getElementsByName("inventory[Hypercubes]")[0].value = to_number(inventory["Hypercube"]);
                document.getElementsByName("inventory[VR Battle Beacons]")[0].value = to_number(inventory["Powerup BB_BATTLE"]);
                document.getElementsByName("inventory[Other Beacons]")[0].value = to_number(getOtherBeacons(inventory));
                document.getElementsByName("inventory[VRHS]")[0].value = to_number(inventory["HS VERY_RARE"]);
                document.getElementsByName("inventory[VRMH]")[0].value = to_number(inventory["Multi-Hack VERY_RARE"]);
                document.getElementsByName("inventory[SBUL]")[0].value = to_number(inventory["Ultra-Link"]);
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
