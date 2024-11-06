function toggleFields() {
    const identify = document.querySelector('input[name="identify"]:checked').value;
    const studentIdGroup = document.getElementById("student-id-group");
    const staffIdGroup = document.getElementById("staff-id-group");
    const subjectGroup = document.getElementById("subject-group");
    const yearGroup = document.getElementById("year-group");
    const studyLevelGroup = document.getElementById("study-level-group");

    if (identify === "นักศึกษา") {
        studentIdGroup.style.display = "block";
        subjectGroup.style.display = "block";
        yearGroup.style.display = "block";
        studyLevelGroup.style.display = "block";
        staffIdGroup.style.display = "none";

    }  if (identify === "อาจารย์,บุคลากร")  {
        studentIdGroup.style.display = "none";
        subjectGroup.style.display = "block";
        yearGroup.style.display = "none";
        studyLevelGroup.style.display = "none";
        staffIdGroup.style.display = "block";

    }   else {
        studentIdGroup.style.display = "block";
        subjectGroup.style.display = "block";
        yearGroup.style.display = "block";
        studyLevelGroup.style.display = "block";
        staffIdGroup.style.display = "none";
    }
}

function toggleAdditionalInput() {
    const objective = document.getElementById("objective").value;
    const additionalInput = document.getElementById("additional-input");

    if (objective === "ติว" || objective === "อื่นๆ") {
        additionalInput.style.display = "block";
    } else {
        additionalInput.style.display = "none";
        additionalInput.value = ""; 
    }
}

document.getElementById("study-room-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const messageDiv = document.getElementById("message");
    messageDiv.style.display = "none"; 

    fetch(this.action, {
        method: "POST",
        body: new FormData(this),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data && !data.error) {
            this.reset();
            messageDiv.textContent = "ทำการบันทึกเรียบร้อยแล้ว";
            messageDiv.style.color = "green";
        } else {
            throw new Error("Error in response data");
        }
    })
    .catch((error) => {
        messageDiv.textContent = "ไม่สามารถส่งข้อมูลได้";
        messageDiv.style.color = "red";
        console.error("ข้อผิดพลาด:", error);
    })
    .finally(() => {
        messageDiv.style.display = "block";
    });
});

function updateDepartment() {
    const faculty = document.getElementById("faculty").value;
    const department = document.getElementById("department");

    const departments = {
        "วิทยาลัยแพทยศาสตร์": [
            "สาขาวิชาแพทยศาสตร์"
        ],
        "วิทยาลัยทันตแพทยศาสตร์ (Bilingual)": [
            "สาขาวิชาทันตแพทยศาสตร์"
        ],
        "วิทยาลัยเภสัชศาสตร์": [
            "สาขาวิชาการบริบาลทางเภสัชกรรม",
            "สาขาวิชาเภสัชกรรมอุตสาหการ"
        ],
        "คณะพยาบาลศาสตร์": [
            "สาขาวิชาพยาบาลศาสตร์",
            "สาขาวิชาพยาบาลศาสตร์ (2.5ปี)"
        ],
        "คณะรังสีเทคนิค": [
            "สาขาวิชาเทคนิคการแพทย์"
        ],
        "คณะเทคนิคการแพทย์": [
            "สาขาวิชาเทคนิคการแพทย์"
        ],
        "กายภาพบำบัดและเวชศาสตร์การกีฬา": [
            "สาขาวิชากายภาพบำบัด",
            "สาขาวิชาวิทยาศาสตร์การออกกำลังกายและสมรรถภาพทางการกีฬา",
            "สาขาวิชาชรัณสุขศาสตร์"
        ],
        "วิทยาลัยการแพทย์แผนตะวันออก": [
            "สาขาวิชาการแพทย์แผนตะวันออก",
            "สาขาวิชาการแพทย์แผนไทย",
            "สาขาวิชาการแพทย์แผนจีน"
        ],
        "คณะวิทยาศาสตร์": [
            "สาขาวิชาวิทยาศาสตร์ชีวการแพทย์"
        ],
        "วิทยาลัยวิศวกรรมชีวการแพทย์": [
            "สาขาวิชาวิทยาศาสตร์ชีวการแพทย์"
        ]
        ,
        "คณะทัศนมาตรศาสตร": [
            "สาขาวิชาทัศนมาตรศาสตร์"
        ]
        ,
        "คณะเทคโนโลยีอาหาร": [
            "สาขาวิชาเทคโนโลยีอาหาร",
            "สาขาวิชาธุรกิจอุตสาหกรรมอาหาร"
        ]
        ,
        "คณะนวัตกรรมเกษตร": [
            "สาขาวิชานวัตกรรมเกษตร"
        ]
        ,
        "วิทยาลัยนวัตกรรมดิจิทัลเทคโนโลยี": [
            "สาขาวิชาวิทยาการคอมพิวเตอร์",
            "สาขาวิชานวัตกรรมดิจิทัล",
            "สาขาวิชาคอมพิวเตอร์เกมและอีสปอร์ต",
            "สาขาวิชาสารสนเทศการลงทุน",
            "สาขาวิชาเทคโนโลยีสื่อสังคม"
        ]
        ,
        "วิทยาลัยวิศวกรรมศาสตร์": [
            "สาขาวิชาวิศวกรรมไฟฟ้า",
            "สาขาวิชาวิศวกรรมเครื่องกล",
            "สาขาวิชาวิศวกรรมโยธา",
            "สาขาวิชาวิศวกรรมเคมี",
            "สาขาวิชาวิศวกรรมอุตสาหการ",
            "สาขาวิชาวิศวกรรมคอมพิวเตอร์",
            "สาขาวิชาวิศวกรรมยานยนต์และมอเตอร์สปอร์ต",
            "สาขาวิชาวิศวกรรมซ่อมบำรุงอากาศยาน"
        ]
        ,
        "สถาบันการบิน": [
            "สาขาวิชานักบินพาณิชย์"
        ]
        ,
        "วิทยาลัยการออกแบบ": [
            "สาขาวิชาศิลปะภาพถ่ายและสื่อทัศนภาพ",
            "สาขาวิชาการออกแบบภายใน",
            "สาขาวิชาการออกแบบนิเทศศิลป์",
            "สาขาวิชาการออกแบบ (English)",
            "สาขาวิชาแฟชั่นดีไซน์"
        ]
        ,
        "คณะดิจิทัลอาร์ต": [
            "สาขาวิชาคอมพิวเตอร์อาร์ต"
        ]
        ,
        "คณะสถาปัตยกรรมศาสตร์": [
            "สาขาวิชาสถาปัตยกรรมศาสตร์"
        ]
        ,
        "คณะบัญชี": [
            "หลักสูตรบัญชี",
            "หลักสูตรบัญชี (สำหรับผู้จบ ปวส.)"
        ]
        ,
        "คณะบริหารธุรกิจ": [
            "สาขาวิชาการจัดการ",
            "สาขาวิชาธุรกิจดิจิทัล",
            "สาขาวิชาการเงินและการลงทุน",
            "สาขาวิชาการตลาดดิจิทัลและนวัตกรรมค้าปลีก",
            "สาขาวิชาการเป็นผู้ประกอบการ",
            "สาขาวิชาการจัดการโลจิสติกส์และซัพพลายเชน",
            "สาขาการบริหารธุรกิจระหว่างประเทศ"
        ]
        ,
        "คณะเศรษฐศาสตร์": [
            "สาขาวิชาเศรษฐกิจดิจิทัล"
        ]
        ,
        "วิทยาลัยศิลปศาสตร์": [
            "สาขาวิชาภาษาญี่ปุ่น",
            "สาขาวิชาภาษาไทยเพื่อการสื่อสาร",
            "สาขาวิชาภาษาอังกฤษ",
            "สาขาวิชาภาษาจีน",
            "สาขาวิชาภาษาฝรั่งเศส",
            "สาขาวิชาภาษาและวัฒนธรรมเกาหลี"
        ]
        ,
        "วิทยาลัยนิเทศศาสตร์": [
            "สาขาวิชาวิทยุและโทรทัศน์มัลติแพลตฟอร์ม",
            "สาขาวิชาการประชาสัมพันธ์และสื่อสารองค์กร",
            "สาขาวิชานวัตกรรมการโฆษณาและสื่อสร้างสรรค์",
            "สาขาวิชาการภาพยนตร์ดิจิทัล",
            "สาขาวิชาสื่อสารการแสดง",
            "สาขาวิชาการสื่อสารการตลาดดิจิทัลและแบรนด์ดิ้ง",
            "สาขาวิชามัลติมีเดีย",
            "สาขาวิชานิเทศศาสตร์การกีฬา",
            "สาขาวิชาการเขียนบทและการกำกับภาพยนตร์และโทรทัศน์",
            "สาขาวิชาการสร้างสรรค์คอนเทนต์ดิจิทัล"
        ]
        ,
        "คณะนิติศาสตร์": [
            "สาขาวิชานิติศาสตร์",
            "สาขาวิชานิติศาสตร์ (ระบบทางไกลทางอินเทอร์เน็ต ปริญญาที่ 2)",
            "สาขาวิชานิติศาสตร์ (ระบบทางไกลทางอินเทอร์เน็ต 4 ปี)"
        ]
        ,
        "วิทยาลัยฮอสปิตอลลิตี้": [
            "สาขาวิชาการจัดการการท่องเที่ยว",
            "สาขาวิชาการจัดการโรงแรมและภัตตาคาร",
            "สาขาวิชาการจัดการธุรกิจการบินและการขนส่ง",
            "สาขาวิชาศิลปะและเทคโนโลยีการประกอบอาหาร"
        ]
        ,
        "วิทยาลัยผู้นำและนวัตกรรมสังคม": [
            "สาขาวิชาผู้นำทางสังคม ธุรกิจ และการเมือง"
        ]
        ,
        "คณะบันรัฐศาสตร์": [
            "สาขาวิชารัฐศาสตร์"
        ]
        ,
        "คณะอาชญาวิทยาและการบริหารงานยุติธรรม": [
            "สาขาวิชาอาชญาวิทยาและนิติวิทยาศาสตร์",
            "สาขาวิชาอาชญาวิทยาและงานยุติธรรม"
        ],
        "วิทยาลัยดนตรี": [
            "ดุริยางคศาสตร์"
        ],
        "International College": [
            "Civil Engineering",
            "International Business",
            "Information and Communication Technology",
            "Communications Arts",
            "International Hospitality and Management"
        ],
        "INSTITUTE OF DIPLOMACY AND INTERNATIONAL STUDIES": [
            "International Relations and Development"
        ],
        "INTERNATIONAL CHINESE COLLEGE (ระบบเหมาจ่าย)": [
            "International Business Management"
        ]
    };

    department.innerHTML = '<option value="" disabled selected>เลือกสาขาวิชา</option>';

    if (departments[faculty]) {
        departments[faculty].forEach(dept => {
            const option = document.createElement("option");
            option.value = dept;
            option.textContent = dept;
            department.appendChild(option);
        });
    }
}
