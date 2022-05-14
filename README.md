# Terrorism Mapping Project

By Harrison Liao, Joohoon Cha, Keith Ellingwood, Wesley Nguyen, and Steven Chen

## Project Idea

For our final project, we are interested in creating a map to inform people of the different terrorism acts that have happened around the world that allows users to see patterns of global terrorist activities and learn more about those activities.  To do this, we will create an interactive dashboard web map of different points where terrorist events happened, allowing users to understand more about global terrorism.

## Project Significance and Broader Impacts

The goal is to provide a better understanding of terrorism acts and the consequences of them, which aims to help the prevention of future terrorism acts.  Since the project is accessible to the whole public, there could be other unintended impacts that come along with it.  One instance would be enforcing stereotypes of certain areas due to its political instability, even though events could be largely local and have no relation to the demographics the user interacts with.  Another would be people with ill intentions trying to replicate the attacks mentioned, although we perceive this risk as very low because there are other materials that are much more influential that incites the user to do such actions.

## Primary Functions and Major Data Sources

For this project, we were looking at using the Global Terrorism Database (GTD), created and maintained by the National Consortium for the Study of Terrorism and Responses to Terrorism (START), a federally sponsored research team from the University of Maryland. This database contains over 200,000 individual entries of terrorism acts that have happened globally from 1970 to 2019, along with many different details of each individual happening. It also includes the latitude and longitude of every event, meaning we will be able to use these coordinates to make an interesting interactive web mapping application. We may also potentially use other sources of data in our map, such as basemaps, in order to make the maps more readable.

For the function of our map, we are planning on making an interactive web map dashboard of all the different terrorism events. We want to map out all of the events within the dataset, with the ability for each event to be a selectable point that the user can click to get more information, such as the amount of injuries, deaths, and any associated sources and articles that are in the database. We also want to potentially have different views and ways to represent the points on the map, such as proportional symbols or color maps based on different aspects of the event. Finally, if time permits it, we are interested in adding the ability to filter/aggregate the data in real time to change the appearance of the map and what the map can represent, an example being a slider to change the date range of the events being shown. This will give users the ability to use our web map to tell different data stories about global terrorism.

## Target Audience

Our target audience is any person who is interested in knowing more about terrorism events and those areas that are vulnerable to it. Being able to see the different events mapped out and hone in on events at different scales will empower our users to better understand these events on a local, national or even fully global scale. Additionally, the ability for the user to change and aggregate what data is being shown gives them tools to tell a data story with our map. All of this will help our audience to visualize, understand, and demonstrate different trends and aspects of global terrorism, hopefully leading to a better understanding of how to quell terrorism for good.

## Multimedia

For the required multimedia we will be incorporating available images and news articles,  potentially even videos if we can find data on them, of each event that you can see upon clicking the points to get more information. Of course, we will also include text of the different statistics of each event that we wish to include.

## Project Format

For the format of our project, we are going to do option one and create an interactive web map dashboard. We are planning on using a Mercator projection since we are working with global data, and we want to start the map projection focused on the United States, with a center coordinate of -96, 40 and a zoom level of 4.

For our basemap, we want something that does not have too much visual clutter and is a high contrast color to better see the terrorism incident points, so we are looking at using a dark, basic basemap such as Mapbox’s dark-v10. We wish to add at least one main thematic layer, being a mapping of all the terrorism events on the map using the GTD data, with each icon either colored or sized by a numeric data value or categorical (deaths/injuries, type of weapon used, ect), with a UI element that gives the user the option to change said value being graphed. Because the symbols need to be dynamically rendered based on user input, this layer will have to be a vector. There are over 200,000 different points we will have to map on said vector layer, which may be too much for Mapbox JS, so we will look into dynamically rendering points based on the current map zoom, as well as potentially grouping and simplifying the way the points are rendered, such as rendering the points as a heatmap or clusters instead of individually at larger zooms. We could also remove any data points in which no deaths, injuries, or large amounts of property damage occurred. We may also incorporate toggleable thematic layers that can demonstrate certain aspects of the data we wish to particularly highlight such as a choropleth layer of the deaths per country due to terrorism attacks. These can be rendered as a raster, with each bounding box being the size of each continent. Finally, we also want to give users the ability to filter certain aspects of the data to change how it shows on the map, and for that we will look into using Mapbox JS’s Other Filter to create a filtering dashboard alongside the map.

The map itself will be hosted/embedded in a website, and contain 2 pages: the map page, as well as an about page that describes the data and our motivations for exploring it.