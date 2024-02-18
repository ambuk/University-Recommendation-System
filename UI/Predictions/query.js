const universityByRegion = (region) => {
    let query = {
        "aggs": {
          "2": {
            "terms": {
              "field": "Region",
              "order": {
                "_count": "desc"
              },
              "size": 10
            },
            "aggs": {
              "3": {
                "terms": {
                  "field": "School Name",
                  "order": {
                    "3-orderAgg": "desc"
                  },
                  "size": 400
                },
                "aggs": {
                  "4": {
                    "terms": {
                      "field": "Starting Median Salary",
                      "order": {
                        "_count": "desc"
                      },
                      "size": 5
                    }
                  },
                  "3-orderAgg": {
                    "max": {
                      "field": "Starting Median Salary"
                    }
                  }
                }
              }
            }
          }
        },
        "size": 0,
        "stored_fields": [
          "*"
        ],
        "script_fields": {},
        "docvalue_fields": [],
        "_source": {
          "excludes": []
        },
        "query": {
          "bool": {
            "must": [],
            "filter": [
              {
                "bool": {
                  "should": [
                    {
                      "match_phrase": {
                        "Region": ""+region
                      }
                    }
                  ],
                  "minimum_should_match": 1
                }
              }
            ],
            "should": [],
            "must_not": []
          }
        }
      }

    return query
}

const universityByType = (collegeType) =>{
  let query = {
    "aggs": {
      "2": {
        "terms": {
          "field": "School Type",
          "order": {
            "_count": "desc"
          },
          "size": 10
        },
        "aggs": {
          "3": {
            "terms": {
              "field": "School Name",
              "order": {
                "3-orderAgg": "desc"
              },
              "size": 500
            },
            "aggs": {
              "4": {
                "terms": {
                  "field": "Starting Median Salary",
                  "order": {
                    "_count": "desc"
                  },
                  "size": 5
                }
              },
              "3-orderAgg": {
                "max": {
                  "field": "Starting Median Salary"
                }
              }
            }
          }
        }
      }
    },
    "size": 0,
    "stored_fields": [
      "*"
    ],
    "script_fields": {},
    "docvalue_fields": [],
    "_source": {
      "excludes": []
    },
    "query": {
      "bool": {
        "must": [],
        "filter": [
          {
            "bool": {
              "should": [
                {
                  "match_phrase": {
                    "School Type": "" + collegeType
                  }
                }
              ],
              "minimum_should_match": 1
            }
          }
        ],
        "should": [],
        "must_not": []
      }
    }
  }

  return query
}

const universityByTuitionAndSATAndControlByInstitution = (UpperLimitTuitionFee, LowerLimitTuitionFee, SATWritingScore, 
  SATMathScore, SATReadingScore, ControlByInstitution) => {
    let query = 
    {
      "aggs": {
        "2": {
          "terms": {
            "field": "Control of institution",
            "order": {
              "_count": "desc"
            },
            "size": 10
          },
          "aggs": {
            "3": {
              "terms": {
                "field": "Name",
                "order": {
                  "_count": "desc"
                },
                "size": 1600
              },
              "aggs": {
                "4": {
                  "terms": {
                    "field": "FIPS state code",
                    "order": {
                      "_count": "desc"
                    },
                    "size": 1600
                  },
                  "aggs": {
                    "5": {
                      "terms": {
                        "field": "Total price for in-state students living on campus 2013-14",
                        "order": {
                          "_count": "desc"
                        },
                        "size": 5
                      },
                      "aggs": {
                        "7": {
                          "terms": {
                            "field": "SAT Writing 75th percentile score",
                            "order": {
                              "_count": "desc"
                            },
                            "size": 5
                          },
                          "aggs": {
                            "8": {
                              "terms": {
                                "field": "SAT Math 75th percentile score",
                                "order": {
                                  "_count": "desc"
                                },
                                "size": 5
                              },
                              "aggs": {
                                "9": {
                                  "terms": {
                                    "field": "SAT Critical Reading 75th percentile score",
                                    "order": {
                                      "_count": "desc"
                                    },
                                    "size": 5
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "size": 0,
      "stored_fields": [
        "*"
      ],
      "script_fields": {},
      "docvalue_fields": [],
      "_source": {
        "excludes": []
      },
      "query": {
        "bool": {
          "must": [],
          "filter": [
            {
              "bool": {
                "filter": [
                  {
                    "bool": {
                      "should": [
                        {
                          "match_phrase": {
                            "Control of institution": ""+ControlByInstitution
                          }
                        }
                      ],
                      "minimum_should_match": 1
                    }
                  },
                  {
                    "bool": {
                      "filter": [
                        {
                          "bool": {
                            "should": [
                              {
                                "range": {
                                  "Total price for in-state students living on campus 2013-14": {
                                    "lte": UpperLimitTuitionFee
                                  }
                                }
                              }
                            ],
                            "minimum_should_match": 1
                          }
                        },
                        {
                          "bool": {
                            "filter": [
                              {
                                "bool": {
                                  "should": [
                                    {
                                      "range": {
                                        "Total price for in-state students living on campus 2013-14": {
                                          "gte": LowerLimitTuitionFee
                                        }
                                      }
                                    }
                                  ],
                                  "minimum_should_match": 1
                                }
                              },
                              {
                                "bool": {
                                  "filter": [
                                    {
                                      "bool": {
                                        "should": [
                                          {
                                            "range": {
                                              "SAT Critical Reading 75th percentile score": {
                                                "lte": SATReadingScore
                                              }
                                            }
                                          }
                                        ],
                                        "minimum_should_match": 1
                                      }
                                    },
                                    {
                                      "bool": {
                                        "filter": [
                                          {
                                            "bool": {
                                              "should": [
                                                {
                                                  "range": {
                                                    "SAT Math 75th percentile score": {
                                                      "lte": SATMathScore
                                                    }
                                                  }
                                                }
                                              ],
                                              "minimum_should_match": 1
                                            }
                                          },
                                          {
                                            "bool": {
                                              "should": [
                                                {
                                                  "range": {
                                                    "SAT Writing 75th percentile score": {
                                                      "lte": SATWritingScore
                                                    }
                                                  }
                                                }
                                              ],
                                              "minimum_should_match": 1
                                            }
                                          }
                                        ]
                                      }
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ],
          "should": [],
          "must_not": []
        }
      }
    }

    return query
}

const getESData = (index,query) =>{
    return $.post("http://149.165.171.6:30005/essearch",JSON.stringify({
        "Index":index,
        "Search":query
    }))
}