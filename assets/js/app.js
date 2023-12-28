
//admin UI
var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
   
    no= document.getElementById("no"),
    title = document.getElementById("title"),
    file = document.getElementById("imgInput"),
    from = document.getElementById("from"),
    to = document.getElementById("to"),
    hours = document.getElementById("hours"),
    type = document.getElementById("type"),
    conducted = document.getElementById("conducted")
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    imgInput.src = "assets/img/cert Icon.png"
    form.reset()
})


file.onchange = function(){
    if(file.files[0].size < 1000000){ // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This file is too large!")
    }
}


function showInfo(){
    document.querySelectorAll('.trainingDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="trainingDetails">
            <td>${index+1}</td>
           
            <td>${element.trainingNo}</td>
            <td>${element.trainingTitle}</td>
            <td><img src="${element.trainingcertpicture}" alt="" width="50" height="50"></td>
            <td>${element.trainingFrom}</td>
            <td>${element.trainingTo}</td>
            <td>${element.trainingHoursNo}</td>
            <td>${element.trainingType}</td>
            <td>${element.trainingSponsored}</td>


            <td>
                <button class="btn btn-success" onclick="readInfo('${element.trainingNo}', '${element.trainingTitle}', '${element.trainingcertpicture}', '${element.trainingFrom}', '${element.trainingTo}', '${element.trainingHoursNo}', '${element.trainingType}','${element.trainingSponsored}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.trainingNo}', '${element.trainingTitlel}', '${element.trainingcertpicture}', '${element.trainingFrom}', '${element.trainingTo}', '${element.trainingHoursNo}', '${element.trainingType}','${element.trainingSponsored}' )" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(no, title, pic, from, to, hours, type, conducted){
   
    document.querySelector('#showTrainingNo').value = no,
    document.querySelector("#showTrainingTitle").value = title,
    document.querySelector('.showImg').src = pic,
    document.querySelector("#showFrom").value = from,
    document.querySelector("#showsTo").value = to,
    document.querySelector("#showsHoursNo").value = hours,
    document.querySelector("#showsTrainingType").value = type,
    document.querySelector("#showsSponsored").value = conducted

}


function editInfo(index, no, title, pic, from, to, hours, type, conducted){
    isEdit = true
    editId = index
   
    no.value = TrainingNo,
    title.value = TrainingTitle,
    imgInput.src = pic
    from.value = From,
    to.value = To,
    hours.value = Hours,
    type.value = TrainingType,
    conducted.value = Conducted

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        
        trainingNo: no.value,
        trainingTitle: title.value,
        trainingcertpicture: imgInput.src == undefined ? "assets/img/cert Icon.png" : imgInput.src,
        trainingFrom: from.value,
        trainingTo: to.value,
        trainingHoursNo: hours.value,
        trainingType: type.value,
        trainingSponsored: conducted.value
    }

    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    showInfo()

    form.reset()

    imgInput.src = "assets/img/cert Icon.png"  

    // modal.style.display = "none"
    // document.querySelector(".modal-backdrop").remove()

    
})
