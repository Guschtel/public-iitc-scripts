# public-iitc-scripts

A collection of userscripts for the augmented reality game ingress.
The author is in no way affiliated with Niantic.

## inventory-overview.user.js

Display an overview of the users inventory (requires the C.O.R.E. subscription to access the inventory API):

![Inventory overview](https://github.com/Guschtel/public-iitc-scripts/blob/main/images/inventory-overview/overview_0.png?raw=true)

![Inventory overview](https://github.com/Guschtel/public-iitc-scripts/blob/main/images/inventory-overview/overview_2.png?raw=true)

Hovering the legend hightlights the item type in the chart:

![Inventory overview highlight](https://github.com/Guschtel/public-iitc-scripts/blob/main/images/inventory-overview/overview_1.png?raw=true)

Display a nice overview of weapons and powercubes:

![Weapons and Powercubes](https://github.com/Guschtel/public-iitc-scripts/blob/main/images/inventory-overview/weapons_0.png?raw=true)

Display an overview of mods:

![Weapons and Powercubes](https://github.com/Guschtel/public-iitc-scripts/blob/main/images/inventory-overview/mods_0.png?raw=true)

## inventory-anomalyhub-updater.user.js
Update the AnomalyHub Inventory with this userscript.
If you use the first script with a C.O.R.E. subscription, then open the Inventory overview and click on "Copy items", your clipboard will be filled with TSV data similar to the following:
```
Type	Rarity	Count
Aegis Shield	VERY_RARE	999
Apex	VERY_RARE	666
Capsule	RARE	777
Drone	COMMON	1
HS	VERY_RARE	666
HS	RARE	666
HS	COMMON	666
Hypercube	VERY_RARE	666
ITO +	VERY_RARE	66
ITO -	VERY_RARE	66
Key	VERY_COMMON	600
Key Capsule	VERY_RARE	6
Kinetic Capsule	COMMON	99
LA	RARE	555
Multi-Hack	VERY_RARE	333
Multi-Hack	RARE	333
PC 8	COMMON	999
Powerup BB_BATTLE	VERY_RARE	999
Powerup BB_BATTLE_RARE	RARE	999
Powerup BN_BLM	VERY_RARE	999
Powerup BN_PEACE	VERY_RARE	999
Powerup ENL	VERY_RARE	999
Powerup FRACK	VERY_RARE	999
Powerup FW_ENL	VERY_RARE	999
Powerup FW_RES	VERY_RARE	999
Powerup LOOK	VERY_RARE	999
Powerup MEET	VERY_RARE	999
Powerup NIA	VERY_RARE	999
Powerup TOASTY	VERY_RARE	999
Resonator 6	COMMON	999
Resonator 7	COMMON	999
Resonator 8	COMMON	999
Shield	RARE	999
Shield	COMMON	999
Shield	VERY_RARE	999
Ultra-Link	VERY_RARE	999
US 8	COMMON	999
Virus ADA	VERY_RARE	999
Virus JARVIS	VERY_RARE	999
XMP 7	COMMON	999
XMP 8	COMMON	9999
```

On Anomalyhub, if you visit the /inventory/update link a new button should appear: "Copy from clipboard", use it to fill the inventory fields, then click "Update" to submit the data.

![Update Inventory View](https://github.com/Guschtel/public-iitc-scripts/blob/main/images/images/inventory-anomalyhub-updater/athens-anomaly-update.png?raw=true)