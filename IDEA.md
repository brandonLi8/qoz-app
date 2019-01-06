<!--  IDEA.md
      QOZ app
      Created by Mike Yan.
-->
## credit
- [Mike Yan](yan.mike@gmail.com)

Background
=======
---
With the tax law President Trump signed, there is a loop hole for investors. QOZ (Qualified Opportunity Zone) is an economically - distressed community where new investments, under certain conditions, may be eligible for preferential tax treatment like, deferring capital gain taxes from sale of stocks, sales of other business till end of 2026, and if the new investment is held for 10 years, then the capital gains from the new investment will be entirely tax free.
 
The problem realtors, investors have is that there is not an easy way to find if an address, for example `123 s main st, denver, co 80202`, is within a qualified zone or not. A mobile app and/or a website that can check if an address lies within an opportunity zone would be very helpful for an investor as part of his/her due diligence when buying an existing business, or in investing new, and it would be a plus for realtors to make their listing stand out with a listing indicating if the property is within a Qualified Opportunity Zone.
 
## How to Check
Step 1) check look for the property tract number with this link :
https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?address=2084+s+hamilton+rd%2C+ohio%2C+43232&benchmark=4&vintage=4
 
(Replacing the address with an address entered by user)
 
Step 2) Retrieve GEOID under "Census Tracts" of the webpage in Step 1).

For example, <br /><br />
```Census Tracts:```<br />
OID: 20790472266650<br />
STATE: 39<br />
FUNCSTAT: S<br />
NAME: Census Tract 93.25<br />
AREAWATER: 77217<br />
LSADC: CT<br />
CENTLON: -082.8826500<br />
BASENAME: 93.25<br />
INTPTLAT: +39.9269709<br />
MTFCC: G5020<br />
COUNTY: 049<br />
```GEOID: 39049009325```<br />
CENTLAT: +39.9274908<br />
INTPTLON: -082.8816116<br />
AREALAND: 5187934<br />
OBJECTID: 2500<br />
TRACT: 009325<br />
 
Step 3),  Download the spreadsheet from [here](https://www.cdfifund.gov/Documents/Designated%20QOZs.12.14.18.xlsx)
 
Look for GEOID from step 2 to see the tract is in the zone. 
 
For simplicity and performance, the spreadsheet may be pre-downloaded, save as "csv" file and built into app as data.