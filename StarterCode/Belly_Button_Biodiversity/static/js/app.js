function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var metadata_url = "/metadata/" + sample;
  // Use d3 to select the panel with id of `#sample-metadata`
  var panelData = d3.select("#sample-metadata");
  // Use `.html("") to clear any existing metadata
  panelData.html("");
  // Use `Object.entries` to add each key and value pair to the panel
  d3.json(metadata_url).then(function (data) {
    Object.entries(data).forEach(([key, value]) => {
      panelData.append("h6").text(`${key}:${value}`)
    });

    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.



    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);


  });

  function buildCharts(sample) {

    // @TODO: Use `d3.json` to fetch the sample data for the plots
    var plotURL = "/samples/" + sample;

    // @TODO: Build a Bubble Chart using the sample data
    d3.json(plotURL).then(function (data) {
      var trace1 = {
        x: data.otu_ids,
        y: data.sample_values,
        mode: 'markers',
        text: data.otu_labels,
        marker: {
          color: data.otu_ids,
          size: data.sample_values,

        }
      }
    })
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  }

  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });

      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }

  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }

  // Initialize the dashboard
  init();
