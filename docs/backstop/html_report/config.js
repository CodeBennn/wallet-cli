report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../../../backstop_data/bitmaps_reference/backstop_default_qqmap_0_document_0_phone.png",
        "test": "../../../backstop_data/bitmaps_test/20230415-114906/backstop_default_qqmap_0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_qqmap_0_document_0_phone.png",
        "label": "qqmap",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://map.qq.com/m/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 1.8449993923927575,
          "misMatchPercentage": "1.84",
          "analysisTime": 27
        },
        "diffImage": "../../../backstop_data/bitmaps_test/20230415-114906/failed_diff_backstop_default_qqmap_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../../../backstop_data/bitmaps_reference/backstop_default_qqmap_0_document_1_tablet.png",
        "test": "../../../backstop_data/bitmaps_test/20230415-114906/backstop_default_qqmap_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_qqmap_0_document_1_tablet.png",
        "label": "qqmap",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://map.qq.com/m/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "tablet",
        "error": "Reference file not found /Users/yuanzhijia/Desktop/web3-education-interface/backstop_data/bitmaps_reference/backstop_default_qqmap_0_document_1_tablet.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});