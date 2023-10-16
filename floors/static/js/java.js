function start(){
    window.open("https://studentnet.cs.manchester.ac.uk/authenticate/?url=http://127.0.0.1:8000/ground_floor&csticket=123456789&version=2&command=validate", "_self");
}

function input_values() {
    i1 = document.getElementById("i1").value;
    i2 = document.getElementById("i2").value;
    sessionStorage.setItem("start_room", i1);
    sessionStorage.setItem("end_room", i2);
}

function find_toilet_men() {
    sessionStorage.setItem("end_room", "Men toilet");
}

function find_toilet_women() {
    sessionStorage.setItem("end_room", "Women toilet");
}

function find_toilet_disabled() {
    sessionStorage.setItem("end_room", "Disabled toilet");
}

var elem = document.getElementById("i1");
elem.value = sessionStorage.getItem("start_room");
var elem2 = document.getElementById("i2");
elem2.value = sessionStorage.getItem("end_room");

const timetableBtn = document.getElementsByClassName("timetableBtn");
const timetableModal = document.getElementsByClassName("modal");
const nav_Btn = document.getElementsByClassName("navigation_button");
const nav_modal = document.getElementsByClassName("modal-content2");

for (let i = 0; i < nav_Btn.length; i++) {
	
	nav_Btn[i].addEventListener("click", function() {
        nav_for_room(nav_Btn[i].id).style.visibility = "visible";
	});
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close");
var span2 = document.getElementsByClassName("close2");

for (let i = 0; i < timetableBtn.length; i++) {
	
	timetableBtn[i].addEventListener("click", function() {
  		room_for(timetableBtn[i].id).style.visibility = "visible";
	});

	window.addEventListener("click", function(event) {
  		if (event.target == room_for(timetableBtn[i].id)) {
                nav_for_room(timetableBtn[i].id).style.visibility = "hidden";
    			room_for(timetableBtn[i].id).style.visibility = "hidden";
  		}
	});
}

for (let i = 0; i < timetableModal.length; i++) {
	// When the user clicks on <span> (x), close the modal
	span[i].onclick = function() {
  		timetableModal[i].style.visibility = "hidden";
        nav_modal[i].style.visibility = "hidden";
	}
}

for (let i = 0; i < nav_modal.length; i++) {
	// When the user clicks on <span> (x), close the modal
	span2[i].onclick = function() {
        nav_modal[i].style.visibility = "hidden";
	}
}

function room_for(id){

	for (let i = 0; i < timetableModal.length; i++) {
	
		if((timetableModal[i].id).localeCompare(id) == 0){
			return timetableModal[i];
		}
	}
	return null;
}

function nav_for_room(id){

	for (let i = 0; i < nav_modal.length; i++) {
	
		if((nav_modal[i].id).localeCompare(id) == 0){
			return nav_modal[i];
		}
	}nav_start
	return null;
}

const nav_start_point = document.getElementsByClassName("nav_start");
const nav_find_btn = document.getElementsByClassName("nav_find");

function nav_start(id){

	for (let i = 0; i < nav_start_point.length; i++) {
	
		if((nav_start_point[i].id).localeCompare(id) == 0){
			return nav_start_point[i];
		}
	}

	return null;
}

for (let i = 0; i < nav_find_btn.length; i++) {
	
	nav_find_btn[i].addEventListener("click", function() {
        optimal_path_alternative(nav_start(nav_find_btn[i].id).value,nav_find_btn[i].id);
	});
}

class Vertex {
  constructor(x, y, floor, neighbors, name="") {
    this.x = x;
    this.y = y;
    this.min_dist = Number.MAX_VALUE; 
    this.neighbors = neighbors;
    this.previous_point = -1;
    this.floor = floor;
    this.name = name;
  }
}

function distance(vert1, vert2) {
    return Math.hypot(vert2.x-vert1.x, vert2.y-vert1.y) + Math.abs(vert2.floor - vert1.floor)*30000;
}
                     
const list = [new Vertex(365, 65, 0, [1], "Loading Bay Entrance"), new Vertex(365, 90, 0, [0,2,4]),
    new Vertex(365, 105, 0, [1,3,5]), new Vertex(365, 115, 0, [2,6]), new Vertex(385, 90, 0, [1,5,76,217,389],"Lift G"), 
    new Vertex(385, 105, 0, [2,4,6,7]),new Vertex(385, 115, 0, [5,8]),new Vertex(415, 105, 0, [5,82]),
    new Vertex(440, 115, 0, [6,9]),new Vertex(440, 200, 0, [8,10,11,71]),new Vertex(420, 200, 0, [9],"ITS Office 1"),
    new Vertex(440, 335, 0, [9,12,13]),new Vertex(440, 345, 0, [11,14,15]),new Vertex(465, 335, 0, [11], "G105"),
    new Vertex(465, 345, 0, [12], "Men toilet"),new Vertex(440, 375, 0, [12,16,18]),new Vertex(430, 375, 0, [15,17]),
    new Vertex(430, 390, 0, [16], "ITS Help Desk"),new Vertex(455, 375, 0, [15,19,20]),new Vertex(470, 375, 0, [18], "Disabled toilet"),
    new Vertex(455, 400, 0, [18,21,25]),new Vertex(485, 400, 0, [20,22,33]),new Vertex(505, 400, 0, [21,23,34]),
    new Vertex(520, 400, 0, [22,24,35,61]),new Vertex(530, 400, 0, [23], "G23"),new Vertex(455, 475, 0, [20,26,27]),
    new Vertex(445, 475, 0, [25], "ITS Help Desk"),new Vertex(455, 495, 0, [25,28,29]),new Vertex(455, 530, 0, [27], "Main Entrance"),
    new Vertex(470, 495, 0, [27,30,31,32]),new Vertex(470, 530, 0, [29], "Main Entrance"),new Vertex(470, 480, 0, [29,139]),
    new Vertex(485, 495, 0, [29,33]),new Vertex(485, 465, 0, [21,32,34]),new Vertex(505, 465, 0, [22,33,35], "Disabled Lift G"),
    new Vertex(520, 465, 0, [23,34,36]),new Vertex(520, 480, 0, [35,37,72]),new Vertex(520, 505, 0, [72], "G7"),
    new Vertex(535, 490, 0, [72,39,40]),new Vertex(535, 505, 0, [38], "G10"),new Vertex(555, 490, 0, [38,41,42]),
    new Vertex(555, 505, 0, [40], "G11"),new Vertex(595, 490, 0, [40,43,44]),new Vertex(595, 505, 0, [42], "G12"),
    new Vertex(610, 490, 0, [42,45,46]),new Vertex(610, 505, 0, [44], "G13"),new Vertex(665, 490, 0, [44,47,48,51]),
    new Vertex(680, 490, 0, [46], "G17"),new Vertex(665, 505, 0, [46,49,50]),new Vertex(680, 505, 0, [48], "G16"),
    new Vertex(645, 505, 0, [48], "G14"),new Vertex(665, 453, 0, [46,52,53,56]),new Vertex(680, 453, 0, [51], "G18"),
    new Vertex(655, 453, 0, [51,54,55]),new Vertex(655, 440, 0, [53], "Men toilet"),new Vertex(635, 453, 0, [53], "G23"),
    new Vertex(665, 440, 0, [51,57,58]),new Vertex(680, 440, 0, [56], "G20"),new Vertex(665, 405, 0, [56,59], "G33"),
    new Vertex(665, 375, 0, [58,60]),new Vertex(655, 375, 0, [59], "G33a"),new Vertex(520, 360, 0, [23,62,75]),
    new Vertex(520, 335, 0, [61,63,64,65]),new Vertex(510, 335, 0, [62], "G105"),new Vertex(530, 335, 0, [62,66], "G36"),
    new Vertex(520, 305, 0, [62], "G41"),new Vertex(545, 335, 0, [64,67,68]),new Vertex(545, 345, 0, [66], "G37"),
    new Vertex(565, 335, 0, [66,69,70]),new Vertex(565, 345, 0, [68], "G35"),new Vertex(580, 335, 0, [68], "G33"),
    new Vertex(460, 200, 0, [9], "ITS Office 2"),new Vertex(520, 490, 0, [36,37,38,73]),new Vertex(495, 490, 0, [72,74]),
    new Vertex(495, 505, 0, [73], "G6"),new Vertex(510, 360, 0, [61], "Women toilet"),

    new Vertex(365, 95, 1, [4,77,217,389], "Lift L1"),new Vertex(365, 105, 1, [76,78]),new Vertex(415, 105, 1, [77,79]),
    new Vertex(415, 60, 1, [78,80,85]),new Vertex(405, 60, 1, [79,81]),new Vertex(405, 70, 1, [80,82,83]),
    new Vertex(405, 85, 1, [7,81]),new Vertex(385, 70, 1, [81,84]),new Vertex(385, 85, 1, [83,220]),
    new Vertex(425, 60, 1, [79,86,87]),new Vertex(425, 45, 1, [85]),new Vertex(460, 60, 1, [85,88,89]),
    new Vertex(460, 45, 1, [87], "LF29"),new Vertex(500, 60, 1, [87,90,91]),new Vertex(500, 45, 1, [89], "LF28"),
    new Vertex(535, 60, 1, [89,92,93]),new Vertex(535, 45, 1, [91], "LF27"),new Vertex(555, 60, 1, [91,94,106]),
    new Vertex(570, 60, 1, [93,95,96]),new Vertex(570, 45, 1, [94], "LF26"),new Vertex(605, 60, 1, [94,97,98]),
    new Vertex(605, 45, 1, [96], "LF25"),new Vertex(640, 60, 1, [96,99,100]),new Vertex(640, 45, 1, [98], "LF24"),
    new Vertex(655, 60, 1, [98,101,102]),new Vertex(665, 60, 1, [100], "LF23"),new Vertex(655, 70, 1, [100,103]),
    new Vertex(655, 95, 1, [102,104]),new Vertex(630, 95, 1, [103,105]),new Vertex(630, 80, 1, [104], "LF22"),
    new Vertex(555, 165, 1, [93,107,109,114]),new Vertex(540, 165, 1, [106,108]),new Vertex(540, 145, 1, [107], "LF31"),
    new Vertex(570, 165, 1, [106,110,111,112]),new Vertex(570, 145, 1, [109], "LF21"),new Vertex(570, 175, 1, [109], "LF17"),
    new Vertex(630, 165, 1, [109,113]),new Vertex(630, 185, 1, [112], "LF15"),new Vertex(555, 185, 1, [106,115,116]),
    new Vertex(510, 185, 1, [114], "LF31"),new Vertex(555, 220, 1, [114,117,118]),new Vertex(510, 220, 1, [116], "LF34"),
    new Vertex(555, 235, 1, [116,119,120]),new Vertex(570, 235, 1, [118], "LF16"),new Vertex(555, 290, 1, [118,121,122]),
    new Vertex(510, 290, 1, [120], "LF39"),new Vertex(555, 335, 1, [120,123,128]),new Vertex(570, 335, 1, [122,124], "LF9"),
    new Vertex(630, 385, 1, [123,125,127]),new Vertex(650, 385, 1, [124,126], "LF12"),new Vertex(650, 400, 1, [125], "LF11"),
    new Vertex(630, 420, 1, [124,129], "LF9"),new Vertex(555, 430, 1, [122,129,132]),new Vertex(630, 430, 1, [127,128,130]),
    new Vertex(650, 430, 1, [129,131,172]),new Vertex(650, 440, 1, [130], "1.1"),new Vertex(555, 455, 1, [128,133]),
    new Vertex(530, 455, 1, [132,134,137]),new Vertex(530, 470, 1, [133,135], "LF8"),new Vertex(530, 540, 1, [134,136]),
    new Vertex(500, 540, 1, [135], "LF7"),new Vertex(490, 455, 1, [133,138,140]),new Vertex(490, 470, 1, [137,139], "Disabled Lift L1"),
    new Vertex(465, 470, 1, [31,138]),new Vertex(375, 455, 1, [137,141],"Disabled Lift L1"),new Vertex(375, 465, 1, [140,142,143,145]),
    new Vertex(415, 465, 1, [141], "Men toilet"),new Vertex(375, 480, 1, [141,144,148]),new Vertex(395, 480, 1, [143], "Women toilet"),
    new Vertex(350, 465, 1, [141,146,148]),new Vertex(310, 465, 1, [145,147]),new Vertex(310, 445, 1, [146,221]),
    new Vertex(350, 480, 1, [145,143,149], "LF1"),new Vertex(350, 540, 1, [148,150]),new Vertex(395, 540, 1, [149,151]),
    new Vertex(450, 540, 1, [150], "LF7"),
    
    new Vertex(580, 450, 2, [141,153]),new Vertex(560, 450, 2, [152,154,155]),new Vertex(560, 465, 2, [153], "LF1"),
    new Vertex(505, 450, 2, [153,221]),new Vertex(505, 385, 2, [157,179,221]),new Vertex(505, 370, 2, [156,158]),
    new Vertex(565, 370, 2, [157,159,160,162]),new Vertex(565, 355, 2, [158], "Courtyard"),new Vertex(580, 370, 2, [158,161,163]),
    new Vertex(615, 370, 2, [160,164,174]),new Vertex(565, 420, 2, [158,163,222]),new Vertex(580, 420, 2, [160,162,164], "Disabled Lift 1"),
    new Vertex(615, 420, 2, [161,163,165]),new Vertex(615, 475, 2, [164,166,167]),new Vertex(615, 545, 2, [165], "Elevated Walkway"),
    new Vertex(710, 475, 2, [165,168,170]),new Vertex(710, 515, 2, [167,169]),new Vertex(760, 515, 2, [168], "1.1"),
    new Vertex(710, 435, 2, [167,171,173]),new Vertex(710, 420, 2, [170,172]),new Vertex(720, 420, 2, [130,171]),
    new Vertex(760, 435, 2, [170], "1.1"),new Vertex(615, 270, 2, [161,175,176]),new Vertex(595, 270, 2, [174], "Courtyard"),
    new Vertex(615, 175, 2, [174,177]),new Vertex(615, 45, 2, [176,178]),new Vertex(595, 45, 2, [177], "1.19"),
    new Vertex(455, 385, 2, [156,180,188]),new Vertex(455, 405, 2, [179,181,182]),new Vertex(455, 420, 2, [180], "1.3"),
    new Vertex(435, 405, 2, [180,183,184]),new Vertex(435, 420, 2, [182], "1.4"),new Vertex(395, 405, 2, [182,185,186,187]),
    new Vertex(395, 420, 2, [184], "1.5"),new Vertex(395, 390, 2, [184], "1.8"),new Vertex(345, 405, 2, [184], "IT Building Bridge"),
    new Vertex(455, 275, 2, [179,189,192]),new Vertex(445, 275, 2, [188,190], "1.10"),new Vertex(380, 275, 2, [189,191]),
    new Vertex(380, 265, 2, [190], "1.15"),new Vertex(455, 165, 2, [188,193,194,195]),new Vertex(445, 165, 2, [192], "1.10"),
    new Vertex(470, 165, 2, [192], "1.23"),new Vertex(455, 125, 2, [192,196,198,202]),new Vertex(430, 125, 2, [195,197,199]),
    new Vertex(405, 125, 2, [196], "1.18A"),new Vertex(455, 70, 2, [195,402]),new Vertex(430, 70, 2, [196,200,201]),
    new Vertex(405, 70, 2, [199], "1.18B"),new Vertex(430, 45, 2, [199], "1.19"),new Vertex(490, 125, 2, [195,203,204]),
    new Vertex(490, 115, 2, [202], "1.20"),new Vertex(505, 125, 2, [202,205,206]),new Vertex(505, 115, 2, [204],"Disabled toilet"),
    new Vertex(520, 125, 2, [204,207,208]),new Vertex(520, 115, 2, [206],"Women toilet"),new Vertex(540, 125, 2, [206,209,210]),
    new Vertex(540, 135, 2, [208], "1.23"),new Vertex(540, 90, 2, [208,211,213]),new Vertex(520, 90, 2, [210],"Men toilet"),
    new Vertex(550, 80, 2, [213], "1.25"),new Vertex(550, 90, 2, [210,212,214]),new Vertex(560, 90, 2, [213,215,216]),
    new Vertex(560, 105, 2, [214], "1.24"),new Vertex(580, 90, 2, [214,217,218]),new Vertex(580, 80, 2, [216,4,76,389], "Lift 1"),
    new Vertex(595, 90, 2, [216,219,220]),new Vertex(595, 105, 2, [218], "1.24A"),new Vertex(595, 65, 2, [184,218]),
    new Vertex(505, 420, 2, [155,156]),

    new Vertex(440, 465, 3, [162,223]),new Vertex(470, 465, 3, [222,224,225]),new Vertex(470, 445, 3, [223], "Disabled Lift 2"),
    new Vertex(470, 485, 3, [223,226,227]),new Vertex(470, 505, 3, [225,228,244]),new Vertex(450, 485, 3, [225,228,230]),
    new Vertex(450, 505, 3, [226,227,229,231]),new Vertex(450, 515, 3, [228], "2.3"),new Vertex(430, 485, 3, [227,231,234]),
    new Vertex(430, 505, 3, [228,230,232]),new Vertex(430, 515, 3, [231], "2.1"),new Vertex(405, 475, 3, [234], "2.125"),
    new Vertex(405, 485, 3, [230,233,235,237]),new Vertex(405, 495, 3, [234], "2.127"),new Vertex(370, 475, 3, [237], "2.123"),
    new Vertex(370, 485, 3, [234,236,239]),new Vertex(355, 475, 3, [239], "2.121"),new Vertex(355, 485, 3, [237,238,240,242]),
    new Vertex(355, 495, 3, [239], "2.126"),new Vertex(315, 475, 3, [242], "2.119"),new Vertex(315, 485, 3, [239,241,243,451]),
    new Vertex(315, 495, 3, [242], "2.124"),new Vertex(490, 505, 3, [226,245,246]),new Vertex(490, 515, 3, [244], "2.4"),
    new Vertex(505, 505, 3, [244,247,304]),new Vertex(520, 505, 3, [246,248,249]),new Vertex(520, 515, 3, [247], "2.6"),
    new Vertex(540, 505, 3, [247,250,251]),new Vertex(540, 515, 3, [249], "2.8"),new Vertex(585, 505, 3, [249,252,254]), new Vertex(585, 495, 3, [251,253], "2.9"),
    new Vertex(585, 435, 3, [252], "2.25A"),new Vertex(610, 505, 3, [251,255,257]),new Vertex(610, 515, 3, [254], "2.10"),
    new Vertex(640, 495, 3, [257], "2.13"),new Vertex(640, 505, 3, [254,256,258]),new Vertex(665, 505, 3, [257,259,260]),
    new Vertex(665, 515, 3, [258], "2.12"),new Vertex(680, 505, 3, [258,261,262]),new Vertex(680, 515, 3, [260], "2.14"),
    new Vertex(740, 505, 3, [260,263,264,267]),new Vertex(750, 505, 3, [262], "2.22"),new Vertex(740, 515, 3, [262,265,266]),
    new Vertex(750, 515, 3, [264], "2.20"),new Vertex(720, 515, 3, [264], "2.16"),new Vertex(740, 485, 3, [262,268,269]),
    new Vertex(750, 485, 3, [267], "2.24"),new Vertex(740, 470, 3, [267,270,271]),new Vertex(720, 470, 3, [269], "2.15"),
    new Vertex(740, 455, 3, [269,272,274]),new Vertex(740, 455, 3, [271], "2.26"),new Vertex(730, 425, 3, [274], "2.19"),
    new Vertex(740, 425, 3, [271,273,275,276]),new Vertex(750, 425, 3, [274]),new Vertex(740, 400, 3, [274,277,278]),
    new Vertex(750, 400, 3, [276], "2.28"),new Vertex(740, 380, 3, [276,279,280]),new Vertex(750, 380, 3, [278], "2.30"),
    new Vertex(740, 370, 3, [278,281,384]),new Vertex(690, 370, 3, [280,282,283]),new Vertex(690, 355, 3, [281], "2.29/2.31"),
    new Vertex(655, 370, 3, [281,284,286]),new Vertex(655, 355, 3, [283], "2.27/2.77"),new Vertex(625, 380, 3, [286], "2.19"),
    new Vertex(625, 370, 3, [283,285], "2.25B"),new Vertex(605, 380, 3, [288], "2.25A"),new Vertex(605, 370, 3, [287,289]),
    new Vertex(565, 370, 3, [288,290]),new Vertex(565, 290, 3, [289,291], "2.25B"),new Vertex(565, 275, 3, [290,292,293]),
    new Vertex(585, 275, 3, [291], "2.27/2.77"),new Vertex(505, 275, 3, [291,294,306]),new Vertex(505, 290, 3, [293,295,296]),
    new Vertex(495, 290, 3, [294], "2.80"),new Vertex(505, 330, 3, [294,297,298]),new Vertex(495, 330, 3, [296], "2.81"),
    new Vertex(505, 370, 3, [296,299,300]),new Vertex(495, 370, 3, [298], "2.82"),new Vertex(505, 435, 3, [298,301,302]),
    new Vertex(495, 435, 3, [300], "2.83"),new Vertex(505, 460, 3, [300,303,304]),new Vertex(495, 460, 3, [302], "Men toilet"),
    new Vertex(505, 480, 3, [246,302,305]),new Vertex(495, 480, 3, [304], "Women toilet"),new Vertex(505, 250, 3, [293,307,308]),
    new Vertex(495, 250, 3, [306], "2.76"),new Vertex(505, 240, 3, [306,309,310]),new Vertex(495, 240, 3, [308], "2.75"),
    new Vertex(505, 200, 3, [308,311,312]),new Vertex(495, 200, 3, [310], "2.74"),new Vertex(505, 170, 3, [310,313,314]),
    new Vertex(520, 170, 3, [312], "Plant Room"),new Vertex(505, 160, 3, [312,315,316]),new Vertex(495, 160, 3, [314], "2.72"),
    new Vertex(505, 115, 3, [314,317,331,386]),new Vertex(555, 115, 3, [316,318,321,322]),new Vertex(555, 130, 3, [317,319,320]),
    new Vertex(535, 130, 3, [318], "2.67A"),new Vertex(565, 130, 3, [318], "2.67"),new Vertex(555, 105, 3, [317], "2.65"),
    new Vertex(595, 115, 3, [317,323,324]),new Vertex(595, 105, 3, [322], "2.63"),new Vertex(660, 115, 3, [322,325,326]),
    new Vertex(660, 105, 3, [324], "2.61"),new Vertex(660, 130, 3, [324,327,328]),new Vertex(675, 130, 3, [326], "2.55"),
    new Vertex(660, 145, 3, [326,329,330]),new Vertex(675, 145, 3, [328], "2.53"),new Vertex(660, 165, 3, [328], "Plant Room"),
    new Vertex(505, 70, 3, [316,332,333]),new Vertex(505, 60, 3, [331], "2.71"),new Vertex(547, 70, 3, [331,334,335]),
    new Vertex(547, 60, 3, [333], "2.70"),new Vertex(567, 70, 3, [333,336,338]),new Vertex(567, 60, 3, [335], "2.69"),
    new Vertex(577, 60, 3, [338], "2.68"),new Vertex(577, 70, 3, [335,337,339,340]),new Vertex(577, 85, 3, [338], "2.63"),
    new Vertex(615, 70, 3, [338,341,342]),new Vertex(615, 60, 3, [340], "2.66"),new Vertex(640, 70, 3, [340,343,344]),
    new Vertex(640, 60, 3, [342], "2.64"),new Vertex(660, 70, 3, [342,345,346]),new Vertex(660, 60, 3, [344], "2.62"),
    new Vertex(680, 70, 3, [344,347,348]),new Vertex(680, 60, 3, [346], "2.60"),new Vertex(707, 70, 3, [346,349,350,353]),
    new Vertex(707, 60, 3, [348], "2.58"),new Vertex(707, 85, 3, [348], "Women toilet"),new Vertex(740, 55, 3, [352,353]),
    new Vertex(750, 55, 3, [351], "2.54"),new Vertex(740, 70, 3, [348,351,354,355]),new Vertex(750, 70, 3, [353]),
    new Vertex(740, 105, 3, [353,356,357,358]),new Vertex(750, 105, 3, [355], "2.52"),new Vertex(730, 105, 3, [355], "Men toilet"),
    new Vertex(740, 140, 3, [355,359,360]),new Vertex(750, 140, 3, [358], "2.50"),new Vertex(740, 160, 3, [358,361,362]),
    new Vertex(730, 160, 3, [360], "2.51"),new Vertex(740, 170, 3, [360,363,364]),new Vertex(750, 170, 3, [362], "2.48"),
    new Vertex(740, 195, 3, [362,365,366,370]),new Vertex(750, 195, 3, [364], "2.46"),new Vertex(715, 195, 3, [364,367,368,369]),
    new Vertex(715, 185, 3, [366], "2.49"),new Vertex(715, 205, 3, [366], "2.43"),new Vertex(690, 195, 3, [366], "2.45/2.47"),
    new Vertex(740, 220, 3, [364,371,372]),new Vertex(750, 220, 3, [370], "2.44"),new Vertex(740, 245, 3, [370,373,374]),
    new Vertex(750, 245, 3, [372], "2.42"),new Vertex(740, 265, 3, [372,375,376,377]),new Vertex(750, 265, 3, [374], "2.40"),
    new Vertex(730, 265, 3, [374], "2.41"),new Vertex(740, 290, 3, [374,378,379,380]),new Vertex(750, 290, 3, [377], "2.38"),
    new Vertex(730, 290, 3, [377], "2.33"),new Vertex(740, 315, 3, [377,381,382]),new Vertex(750, 315, 3, [380], "2.36"),
    new Vertex(740, 335, 3, [380,383,384]),new Vertex(750, 335, 3, [382], "2.34"),new Vertex(740, 360, 3, [382,385,280]),
    new Vertex(750, 360, 3, [384], "2.32"),new Vertex(450, 115, 3, [316,387]),new Vertex(450, 100, 3, [386,388,389,390]),
    new Vertex(470, 100, 3, [387], "2.71A"),new Vertex(450, 90, 3, [387,391,4,76,217], "Lift 2"),new Vertex(430, 100, 3, [387,391]),
    new Vertex(430, 90, 3, [389,390,392,393]),new Vertex(430, 75, 3, [391], "2.86"),new Vertex(400, 90, 3, [391,394,395,396]),
    new Vertex(400, 100, 3, [393], "2.87"),new Vertex(400, 60, 3, [393], "2.88"),new Vertex(375, 90, 3, [393,397,398]),
    new Vertex(375, 100, 3, [396], "2.91"),new Vertex(355, 90, 3, [396,400,401]),new Vertex(400, 75, 3, [393,395,456]),
    new Vertex(355, 100, 3, [398], "2.93"),new Vertex(340, 90, 3, [398,402,404]),new Vertex(340, 110, 3, [401,198]),
    new Vertex(325, 75, 3, [404], "2.90"),new Vertex(325, 90, 3, [401,403,405]),new Vertex(310, 90, 3, [404,406,407]), new Vertex(310, 100, 3, [405], "2.95"),
    new Vertex(285, 90, 3, [405,408,409]),new Vertex(285, 75, 3, [407], "2.92"),new Vertex(275, 90, 3, [407,410,413]),
    new Vertex(255, 90, 3, [411,412]),new Vertex(255, 75, 3, [410], "2.94"),new Vertex(245, 90, 3, [410], "2.96"),
    new Vertex(275, 120, 3, [409,414,415,416]),new Vertex(285, 120, 3, [413], "Men toilet"),new Vertex(265, 120, 3, [413], "2.100"),
    new Vertex(275, 135, 3, [413,417,418]),new Vertex(285, 135, 3, [416], "2.99"),new Vertex(275, 165, 3, [416,419,420,421]),
    new Vertex(285, 165, 3, [418], "2.101"),new Vertex(265, 165, 3, [418], "2.102"),new Vertex(275, 195, 3, [418,422,423]),
    new Vertex(285, 195, 3, [421], "2.103"),new Vertex(275, 210, 3, [421,424,425]),new Vertex(265, 210, 3, [423], "2.104"),
    new Vertex(275, 230, 3, [423,426,427]),new Vertex(285, 230, 3, [425], "2.105"),new Vertex(275, 255, 3, [425,428,429,430]),
    new Vertex(285, 255, 3, [427], "2.107"),new Vertex(265, 255, 3, [427], "2.106"),new Vertex(275, 290, 3, [427,431,432,433]),
    new Vertex(285, 290, 3, [430], "2.109"),new Vertex(265, 290, 3, [430], "2.108"),new Vertex(275, 320, 3, [430,434,435,436]),
    new Vertex(285, 320, 3, [433], "2.111"),new Vertex(265, 320, 3, [433], "2.110"),new Vertex(275, 350, 3, [433,437,438]),
    new Vertex(285, 350, 3, [436], "2.113"),new Vertex(275, 365, 3, [436,439,440]),new Vertex(265, 365, 3, [438], "2.112"),
    new Vertex(275, 395, 3, [438,441,442]),new Vertex(285, 395, 3, [440], "2.115"),new Vertex(275, 405, 3, [440,443,444]),
    new Vertex(265, 405, 3, [442], "2.114"),new Vertex(275, 425, 3, [442,445,446]),new Vertex(285, 425, 3, [444], "Disabled toilet"),
    new Vertex(275, 445, 3, [444,447,448]),new Vertex(265, 445, 3, [446], "2.116"),new Vertex(275, 470, 3, [446,449,450]),
    new Vertex(285, 470, 3, [448], "Men toilet"),new Vertex(275, 485, 3, [448,451,453]),new Vertex(285, 485, 3, [450,452,242]),
    new Vertex(285, 495, 3, [451], "2.122"),new Vertex(255, 485, 3, [450,454,455]),new Vertex(255, 495, 3, [453], "2.120"),
    new Vertex(240, 485, 3, [453], "2.120A"),new Vertex(385, 75, 3, [399], "2.89")];

function DJ(i1,i2,max_path){

    for (let i = 0; i < list.length; i++) {
        list[i].min_dist = Number.MAX_VALUE;
        list[i].previous_point = -1;
    } 
    
    list[i1].min_dist = 0;
    
    var queue = [];
    queue.push(i1);
    var index,new_min_dist,removed,element;
    
    while (queue.length > 0) {
        
        removed = queue.shift();
        element = list[removed];
        
        
        for (let i = 0; i < element.neighbors.length; i++) {
            
            index = element.neighbors[i];
            new_min_dist = element.min_dist + distance(element,list[index]);
            
            if(new_min_dist < list[index].min_dist){
                
                queue.push(index);
                list[index].min_dist = new_min_dist;
                list[index].previous_point = removed;
            }
        }
    }
    
    index = i2;
    current_path = 0;
    old_index = -1;

    while(index != -1){
        
        if(old_index != -1 && index != -1){
            current_path += distance(list[old_index],list[index]);
        }
        old_index = index;

        queue.push(index);
        index = list[index].previous_point;
    }
    
    if(current_path < max_path || max_path == -1){
        sessionStorage.setItem("wayList", queue.reverse());
        sessionStorage.setItem("number_instruction", 0);
        update_instruction();
        return current_path;
    }
    
    return max_path;
}

function optimal_path(){

    console.log(1);
    i1 = all_entrances(document.getElementById("i1").value);
    i2 = all_entrances(document.getElementById("i2").value);
    current_min_length = -1;

    for(let i = 0; i < i1.length; i++){
        for (let j = 0; j < i2.length; j++) {
            current_min_length = DJ(i1[i],i2[j], current_min_length);
        }
    }
}

function optimal_path_alternative(i1,i2){

    console.log(2);
    i1 = all_entrances(i1);
    i2 = all_entrances(i2);
    current_min_length = -1;

    for(let i = 0; i < i1.length; i++){
        for (let j = 0; j < i2.length; j++) {
            current_min_length = DJ(i1[i],i2[j], current_min_length);
        }
    }
}

function visFloor(floor){
    
    queue = sessionStorage.getItem("wayList");
    queue = JSON.parse("[" + queue + "]");
    result = "";
    
    for(let i = 0; i < queue.length; i++){
    
        if(list[queue[i]].floor == floor){
            result += list[queue[i]].x + "," + list[queue[i]].y + " ";
        }
    }

    return result;
}

function all_entrances(name){

    console.log(name);
    if(name.localeCompare("") == 0){
        return -1;
    }
    
    var number = [];
    
    for(let i = 0; i < list.length; i++){
        if(name.localeCompare(list[i].name) == 0){
            number.push(i);
        }
    }
    
    return number;
}

function name_to_number(name){
    
    if(name.localeCompare("") == 0){
        return -1;
    }
    
    var number = -1;
    
    for(let i = 0; i < list.length; i++){
        if(name.localeCompare(list[i].name) == 0){
            return i;
        }
    }
    
    return number;
}

function steps(step){
    
    var old_number = parseInt(sessionStorage.getItem("number_instruction"));
    
    queue = sessionStorage.getItem("wayList");
    queue = JSON.parse("[" + queue + "]");
    
    if(old_number + step >= 0 && old_number + step < queue.length){
        sessionStorage.setItem("number_instruction", old_number + step);    
    }
    
    update_instruction();
}

function determinant(vert1, vert2, vert3){
    
    var x1 = vert2.x - vert1.x;
    var x2 = vert3.x - vert2.x;
    var y1 = vert2.y - vert1.y;
    var y2 = vert3.y - vert2.y;
    
    return x1*y2 - x2*y1;
}

function update_instruction(){
    
    var number = parseInt(sessionStorage.getItem("number_instruction"));
    
    queue = sessionStorage.getItem("wayList");
    queue = JSON.parse("[" + queue + "]");

    if(number == 0){
        var vert2 = list[queue[number]];
        var vert3 = list[queue[number+1]]; 
        console.log(queue)

        if(vert2.floor != vert3.floor){
             sessionStorage.setItem("instruction", "Change floors!");
             return;
        }

        sessionStorage.setItem("instruction", "Walk straight!");
        return;
    }

    if(number == queue.length-1){
        sessionStorage.setItem("instruction", "You have arrived!");
        return;
    }
    
    var vert1 = list[queue[number-1]];
    var vert2 = list[queue[number]];
    var vert3 = list[queue[number+1]];
    
    // say exact floor!!!
    if(vert2.floor != vert3.floor){
        sessionStorage.setItem("instruction", "Change floors!");
        return;
    }
    
    if(vert1.floor != vert2.floor){
        sessionStorage.setItem("instruction", "Walk straight!");
        return;
    }
    
    var sin = determinant(vert1,vert2,vert3)/(distance(vert1,vert2)*distance(vert2,vert3));
    
    if(sin < -0.5){
        sessionStorage.setItem("instruction", "Walk left!");
    }
    else if(sin > 0.5){
        sessionStorage.setItem("instruction", "Walk right!");
    }
    else{
        sessionStorage.setItem("instruction", "Walk straight!");
    } 
}

function drawPath(floor){
    
    var number = parseInt(sessionStorage.getItem("number_instruction"));
    queue = sessionStorage.getItem("wayList");
    queue = JSON.parse("[" + queue + "]");
    result = "";
    
    if(list[queue[number]].floor == floor && number < queue.length - 1 && list[queue[number+1]].floor == floor){
        result = list[queue[number]].x + "," + list[queue[number]].y + " " + list[queue[number+1]].x + "," + list[queue[number+1]].y;
    }

    return result;
}

function change_floor(form) {

    var number = parseInt(sessionStorage.getItem("number_instruction"));
    queue = sessionStorage.getItem("wayList");
    queue = JSON.parse("[" + queue + "]");
    var floor = list[queue[number]].floor;

    if(floor == 0){
        form.action = "ground_floor";
    }
    if(floor == 1){
        form.action = "half_floor";
    }
    if(floor == 2){
        form.action = "first_floor";
    }
    if(floor == 3){
        form.action = "second_floor";
    }

    return true;
}

// targeting the svg itself
// const svg = document.querySelector("svg");
const svg = document.querySelectorAll("svg")[1];

// variable for the namespace 
const svgns = "http://www.w3.org/2000/svg";

// make a simple polyline
let newRect = document.createElementNS(svgns, "polyline");

newRect.setAttributeNS(null, "points", visFloor(sessionStorage.getItem("floor")));
newRect.setAttributeNS(null, "fill", "none");
newRect.setAttributeNS(null, "stroke", "black");
newRect.setAttributeNS(null, "stroke-width", "0.5");

// make a simple polyline
let path = document.createElementNS(svgns, "polyline");

path.setAttributeNS(null, "points", drawPath(sessionStorage.getItem("floor")));
path.setAttributeNS(null, "fill", "none");
path.setAttributeNS(null, "stroke", "#312450");
path.setAttributeNS(null, "stroke-width", "4");

// append the new polyline to the svg
svg.appendChild(newRect);

// append the new polyline to the svg
svg.appendChild(path);

