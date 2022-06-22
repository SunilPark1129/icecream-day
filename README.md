# Ice Cream Day
![aside menu - Copy](https://user-images.githubusercontent.com/106734133/173826606-94378972-b275-4c35-aee1-dcd5d364634f.jpg)

Check preview website - [Link](https://sunilpark1129.github.io/icecream-day/)

## Project Description
Ice Cream Day is an ice cream shop, and their website provides a list of sales and ongoing events. This time, I wanted to create a website in a new way, so I started with the idea of moving the pages horizontally. In this project, I paid more attention to animation effects to take a new challenge with css.

## Features
|Feature|Description|
|:--:|:--:|
|Navbar Cover|<img src="https://user-images.githubusercontent.com/106734133/173740659-2f7f1054-5a82-45bf-9105-ba52485f7a37.gif" width="400" height="400"><br>When a user visits the website, it wraps all the pages in a navbar. When the button is selected, the cover of the wrapped navbar disappears while moving to the page and the animation is triggered.|
|Text Background Sliding|<img src="https://user-images.githubusercontent.com/106734133/173740872-178e8478-a30f-40fb-b887-c174149ce0f1.gif" width="400" height="400"><br>As the background slides, the hidden text is displayed. To do this, this text has a ```position: absolute``` of 5 spams, and fills the background from ```left: 0%``` to ```left: 80%``` by ```width: 20%```. The text is matched with the background color to create a visual effect as if the text appeared.|
|One-page Website|<img src="https://user-images.githubusercontent.com/106734133/173741327-9b336183-e69a-4086-b26b-6d967e8fc244.gif" width="400" height="300"><br>As a new challenge, created a horizontal one-page website. It looks like a total of 3 pages are connected horizontally, but it is actually 2 pages. There are two 100% width pages, the existing page moves to ```left: -100%``` and the new page moves from ```left: 100%``` to ```left: 0%```.|
|Scroll Events|<img src="https://user-images.githubusercontent.com/106734133/173741723-90b1c4ac-0b0e-4a6e-9f6b-ce0bded8430e.gif" width="400" height="300"><br>When the user scrolls to reach the section, the scroll event is triggered. When the user scrolls back up and out of the section position, hides the contents of the section again.|
|Selecting Items|<img src="https://user-images.githubusercontent.com/106734133/173741959-61439c08-e843-483b-8a07-f7ad421a0b9c.gif" width="400" height="300"><br>When an item is clicked, ```display: none``` is removed with ```classList.remove('display-none')``` of the array to show the information of the next array. All items have names and prices set, so whenever the user clicks on a new item, the value is stored in a new array. When the user clicks on all the necessary items, the name and price are displayed at the bottom. Frozen yogurt or milkshake does not require a cone, so clicking on this item skips picking a cup and goes directly to the results section.|

## Tech Used
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

## Installation
1. Clone the repo
```
git clone https://github.com/SunilPark1129/icecream-day
```

## That can be improved
- I need to make the class names more efficient so that they are more visually organized, easier to understand and easier to see.
- I need to learn how to create a project that fetches items using the API rather than calling an item that was created directly in local.
- I need to create a project using other open source JavaScript framework.

## Project Status
Completed
