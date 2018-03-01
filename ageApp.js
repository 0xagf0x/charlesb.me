function verifyage() { 
  
if (document.getElementById("chkVerify").checked) { 
   var dob = document.getElementById("txtDob").value; 
     if (dob.search(/\d\d\/\d\d\/\d\d\d\d/g)!= -1 ) { 
        var dobstr = dob.split("/"); 
        var currentAge; 
        var mon = dobstr[0]; 
        var day = dobstr[1]; 
        var yr = dobstr[2]; 
        today = new Date(); 
        var pastdate = new Date(yr, mon - 1, day); 
        yearspast = today.getFullYear() - yr - 1 
        tail = (today.getMonth() > mon - 1 || today.getMonth() == mon - 1 && today.getDate() >= day) ? 1 : 0 
        pastdate.setFullYear(today.getFullYear()) 
        pastdate2 = new Date(today.getFullYear() - 1, mon - 1, day) 
        currentAge = yearspast + tail;
if (currentAge <=17)  alert("Please Leave Site Now"); 
            } else alert("Please select a Valid Date of Birth"); 
        } 
   else  alert("Age Verification Box Must be Selected"); 
  } 