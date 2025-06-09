// ==UserScript==
// @name         Anomaly Update Ingress Inventory
// @id           guschtel@inventory-update
// @description  Update inventory script
// @author       Guschtel
// @namespace    http://tampermonkey.net/
// @category     Utilities
// @version      0.9
// @match        https://*.willbe.blue/inventory/update
// @icon         https://www.google.com/s2/favicons?sz=64&domain=willbe.blue
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log('Running script! -------------------------------------');

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

    function isiOS() {
        return (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
    }

    function isFirefox() {
        return (/Firefox/i.test(navigator.userAgent));
    }

    function getClipboardContentFromDialog() {
        return new Promise((resolve, reject) => {
            console.log("Read clipboard from Dialog start");
            const dialog = document.createElement('dialog');
            const description = document.createElement('p');
            const textarea = document.createElement('textarea');
            const okButton = document.createElement('button');
            const cancelButton = document.createElement('button');

            console.log("Elements created");

            dialog.style.padding = '1em';
            description.textContent = 'The clipboard could not be accessed in your browser. Please paste your inventory into the textarea below.';
            textarea.style.width = '400px';
            textarea.style.height = '200px';
            textarea.style.marginBottom = '1em';
            okButton.textContent = 'OK';
            cancelButton.textContent = 'Cancel';
            okButton.style.marginRight = '1em';

            console.log("Styles set");

            dialog.appendChild(description);
            dialog.appendChild(textarea);
            dialog.appendChild(document.createElement('br'));
            dialog.appendChild(okButton);
            dialog.appendChild(cancelButton);

            console.log("Dialog elements added");

            okButton.onclick = () => {
                dialog.close();
                resolve(textarea.value);
            };
            cancelButton.onclick = () => {
                dialog.close();
                reject(new Error('Dialog for inserting clipboard content cancelled'));
            };

            document.body.appendChild(dialog);

            console.log("Dialog added to body");

            dialog.showModal();

            console.log("Dialog shown");
        });
    }

    function getClipboardContent() {
        try {
            if (isFirefox()) {
                return navigator.clipboard.readText();
            }
            if (isiOS()) {
                console.log("iOs: Read clipboard attempt");
                if (!navigator.clipboard?.readText) {
                    console.log("iOs: Read clipboard content from dialog bc navigator.clipboard.readText is not available");
                    return getClipboardContentFromDialog();
                }
                console.log("iOs: Read clipboard normally");
                return navigator.clipboard.readText();
            } else {
                // Chrome
                return navigator.permissions.query({name: "clipboard-read"}).then(
                    async (result) => {
                        if (result.state === "granted" || result.state === "prompt") {
                            return await navigator.clipboard.readText();
                        } else {
                            return getClipboardContentFromDialog();
                        }
                    },
                    (error) => {
                        if (error.message.includes("clipboard-read")) {
                            return getClipboardContentFromDialog();
                        }
                        throw error;
                    }
                );
            }
        } catch (e) {
            console.error('Failed to read clipboard contents in catch: ', e);
            return getClipboardContentFromDialog();
        }
    }

    var updateBtn = document.getElementsByClassName("btn btn-primary")[0];

    console.log('Update Button found');

    let copyCPbtn = document.createElement("button");

    console.log('Copy Button created');

    copyCPbtn.innerHTML = "Copy from Clipboard";
    copyCPbtn.className = "btn btn-primary";
    copyCPbtn.style = "margin-left: 1em;";

    console.log('Copy Button styles all set');

    copyCPbtn.onclick = function () {
        console.log('Copy button clicked');
        getClipboardContent()
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

    console.log('After buttons setup');

    updateBtn.parentNode.insertBefore(copyCPbtn, updateBtn.nextSibling);

    console.log('Insert Button successful');
})();
