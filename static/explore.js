function hamclick(){
    let headRight=document.getElementById("headRight")
    if (headRight.style.display == "flex") {
        headRight.style.display = "none";
    } else {
        headRight.style.display = "flex";
    }
}
function morePage(){
    page+=1
    explorerq.open("post","/explore")
    explorerq.onload=function(){
        let exploreData=JSON.parse(this.responseText);
        if (exploreData["page"]==null){
            document.getElementById("pageButton").classList.add("display")
        }else{
            document.getElementById("pageButton").classList.remove("display")
        }
        let resultBar=document.getElementById("resultBar")
        let n=0
        while(n<exploreData["data"].length){
            let card=document.createElement("a")
            let Img=document.createElement("img")
            let Title=document.createElement("div")
            let Content=document.createElement("div")
            card.classList.add("resultCard")
            Img.classList.add("resultImg")
            Title.classList.add("resultTitle")
            Content.classList.add("resultContent")

            card.setAttribute("href",exploreData["data"][n][3])
            card.setAttribute("target","_blank")
            Img.setAttribute("src",exploreData["data"][n][2])
            Title.textContent=exploreData["data"][n][0]
            Content.textContent=exploreData["data"][n][1]

            resultBar.appendChild(card)
            card.appendChild(Img)
            card.appendChild(Title)
            card.appendChild(Content)
            n+=1

        }
    }
    explorerq.send(JSON.stringify({"city":city,"page":page}))
}
let explorerq= new XMLHttpRequest()
page=1
city="taipei"
explorerq.open("post","/explore")
explorerq.onload=function(){
    let exploreData=JSON.parse(this.responseText);
    if (exploreData["page"]==null){
        document.getElementById("pageButton").classList.add("display")
    }else{
        document.getElementById("pageButton").classList.remove("display")
    }
    let resultBar=document.getElementById("resultBar")
    let n=0
    while(n<exploreData["data"].length){
        let card=document.createElement("a")
        let Img=document.createElement("img")
        let Title=document.createElement("div")
        let Content=document.createElement("div")
        card.classList.add("resultCard")
        Img.classList.add("resultImg")
        Title.classList.add("resultTitle")
        Content.classList.add("resultContent")

        card.setAttribute("href",exploreData["data"][n][3])
        card.setAttribute("target","_blank")
        Img.setAttribute("src",exploreData["data"][n][2])
        Title.textContent=exploreData["data"][n][0]
        Content.textContent=exploreData["data"][n][1]

        resultBar.appendChild(card)
        card.appendChild(Img)
        card.appendChild(Title)
        card.appendChild(Content)
        n+=1

    }
}
explorerq.send(JSON.stringify({"city":city,"page":page}))
function explore(){
    city=document.getElementById("search").value
    let resultBar=document.getElementById("resultBar")
    resultBar.innerHTML=""
    let placeLoad=document.getElementById("placeLoad")
    placeLoad.classList.remove("display")
    let explorerq= new XMLHttpRequest()
    page=1
    explorerq.open("post","/explore")
    explorerq.onload=function(){
        let exploreData=JSON.parse(this.responseText);
        if (exploreData["page"]==null){
            document.getElementById("pageButton").classList.add("display")
        }else{
            document.getElementById("pageButton").classList.remove("display")
        }
        let n=0
        while(n<exploreData["data"].length){
            let card=document.createElement("a")
            let Img=document.createElement("img")
            let Title=document.createElement("div")
            let Content=document.createElement("div")
            card.classList.add("resultCard")
            Img.classList.add("resultImg")
            Title.classList.add("resultTitle")
            Content.classList.add("resultContent")

            card.setAttribute("href",exploreData["data"][n][3])
            card.setAttribute("target","_blank")
            Img.setAttribute("src",exploreData["data"][n][2])
            Title.textContent=exploreData["data"][n][0]
            Content.textContent=exploreData["data"][n][1]

            resultBar.appendChild(card)
            card.appendChild(Img)
            card.appendChild(Title)
            card.appendChild(Content)
            n+=1

        }
        placeLoad.classList.add("display")
    }
    explorerq.send(JSON.stringify({"city":city,"page":page}))
}
//??????????????????????????? 
function checkMember(){
        let reqMember=new XMLHttpRequest();
        reqMember.open("get","/api/user")
        reqMember.onload=function(){
            let getdata=JSON.parse(this.responseText);
            let signInbtn=document.getElementById("signInbtn")
            let signOutbtn=document.getElementById("signOutbtn")
            if(getdata["data"]!=null){
                signInbtn.classList.add("display")
                signOutbtn.classList.remove("display")
            }
            let loading=document.getElementById("loading")
            loading.classList.add("display") 
        }
        reqMember.send()
}
//??????
function signOut(){
    let reqsignOut=new XMLHttpRequest()
    reqsignOut.open("delete","/api/user")
    reqsignOut.onload=function(){
        let signInbtn=document.getElementById("signInbtn")
        let signOutbtn=document.getElementById("signOutbtn")
        window.location.reload()
        signInbtn.classList.remove("display")
        signOutbtn.classList.add("display")
        
    }
    reqsignOut.send()
}    
// ??????
function signIn(){
    let signineMail=document.getElementById("signinEmail").value
    let signinPassword=document.getElementById("signinPassword").value
    let signinError=document.getElementById("signinError")
    if(signineMail==""|signinPassword==""){
        signinError.classList.remove("display")
    }else{
        let reqsignIn=new XMLHttpRequest()
        reqsignIn.open("post","/api/user")
        reqsignIn.onload=function(){
            signindata=JSON.parse(this.responseText);
            if (signindata["ok"]==true){
                window.location.reload()
            }else{
                signinError.classList.remove("display")
            }
            
        }
        reqsignIn.send(JSON.stringify({"email":signineMail,"password":signinPassword}))
    }
}  
//??????
function signUp(){
    let signupName=document.getElementById("signupName").value
    let signupMail=document.getElementById("signupEmail").value
    let signupPassword=document.getElementById("signupPassword").value
    let signupemailError=document.getElementById("signupemailError")
    let signupspaceError=document.getElementById("signupspaceError")
    // ??????input????????????
    if(signupName==""| signupMail==""| signupPassword==""){
        signupspaceError.classList.remove("display")
    }else{
        // ????????????API
        let reqsignUp=new XMLHttpRequest();
        reqsignUp.open("post","/api/user")
        reqsignUp.onload=function(){
            signupdata=JSON.parse(this.responseText);
            if(signupdata["ok"]==true){
                //???????????????????????????
                let reqsignIn=new XMLHttpRequest()
                reqsignIn.open("post","/api/user")
                reqsignIn.onload=function(){
                    signindata=JSON.parse(this.responseText);
                    if (signindata["ok"]==true){
                        window.location.reload()
                    }else{
                        let signinError=document.getElementById("signinError")
                        signinError.classList.remove("display")
                    }
                    
                }
                reqsignIn.send(JSON.stringify({"email":signupMail,"password":signupPassword}))
            }else{
                // ????????????????????????
                signupspaceError.classList.add("display")
                signupemailError.classList.remove("display")
            }
        }
        reqsignUp.send(JSON.stringify({"name":signupName,"email":signupMail,"password":signupPassword}))

    }
}
// ????????????
function signinWindow(){
    let signIn=document.getElementById("signIn");
    let signUp=document.getElementById("signUp");
    let windowBackground=document.getElementById("windowBackground")
    let signinError=document.getElementById("signinError")
    let signupspaceError=document.getElementById("signupspaceError")
    let signupemailError=document.getElementById("signupemailError")
    windowBackground.classList.remove("display");
    signUp.classList.add("display");
    signIn.classList.remove("display");
    // ??????????????????
    signinError.classList.add("display");
    signupspaceError.classList.add("display");
    signupemailError.classList.add("display");
}
function signupWindow(){
    let signIn=document.getElementById("signIn");
    let signUp=document.getElementById("signUp");
    let signupspaceError=document.getElementById("signupspaceError")
    let signupemailError=document.getElementById("signupemailError")
    windowBackground.classList.remove("display");
    signUp.classList.remove("display");
    signIn.classList.add("display");
    // ??????????????????
    signinError.classList.add("display");
    signupspaceError.classList.add("display");
    signupemailError.classList.add("display");
}
function closeWindow(){
    let signIn=document.getElementById("signIn");
    let signUp=document.getElementById("signUp");
    let signupspaceError=document.getElementById("signupspaceError")
    let signupemailError=document.getElementById("signupemailError")
    windowBackground.classList.add("display");
    signUp.classList.add("display");
    signIn.classList.add("display");
    // ??????????????????
    signupspaceError.classList.add("display");
    signupemailError.classList.add("display");
}
