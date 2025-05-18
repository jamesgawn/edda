# Elite Dangerous: Deep Space Insights

## Introduction

A experimental project to show realtime data about new discoveries made by players in [Elite Dangerous](https://www.elitedangerous.com). The data is sourced via [EDDN](https://github.com/EDCD/EDDN), processed by a NodeJS backend, and displayed in a Vue based single page application.

## Notes

Boop -> FFS Discovery Scan
FSS Body Scan -> Scan / Detailed for each body, then a FSSAllBodysScannedEvent
Detailed Surface Scan -> SSA Scan Complete, followed by a duplicate Scan/Detailed

Interesting data points:

- How many systems discovered
- How many systems with all bodies scanned
- How many bodys scanned
- How many bodys mapped
- How many of each world type found
- Timeline of systems scanned
- Timeline of earth like planets found
