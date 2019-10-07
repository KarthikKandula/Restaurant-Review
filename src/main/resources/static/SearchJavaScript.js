
	var searchbyname = document.getElementById("searchbyname");
	searchbyname.addEventListener("click", checkbyName);
	
	var searchbycity = document.getElementById("searchbycity");
	searchbycity.addEventListener("click", checkbyCities);

	
	function checkbyCities()
	{
	var xhttp = new XMLHttpRequest();
	xhttp.addEventListener("load", response);
	xhttp.responseType = "json";
	xhttp.open("GET", "https://opentable.herokuapp.com/api/restaurants?city="+encodeURIComponent(document.getElementById("city").value));
	xhttp.send();
	}
	
	function checkbyName()
	{
	var xhttp = new XMLHttpRequest();
	xhttp.addEventListener("load", response);
	xhttp.responseType = "json";
	xhttp.open("GET", "https://opentable.herokuapp.com/api/restaurants?name="+encodeURIComponent(document.getElementById("name").value));
	xhttp.send();
	}
	
	function clickonlink(linkid)
	{
		var xhttp = new XMLHttpRequest();
		xhttp.addEventListener("load", singledata);
		xhttp.responseType = "json";
		xhttp.open("GET", "https://opentable.herokuapp.com/api/restaurants/"+encodeURIComponent(linkid));
		xhttp.send(); 
		document.getElementById("restaurantid").value = linkid;
		
	}
	
	function singledata() 
	{
		if (this.status === 200) 
		{
			var data = this.response;
			console.log(data);
			
				//clearing data from div with id="test"
				document.getElementById("test").innerHTML = "";
				
				//creating table
				var table = $("<table></table>");
				var row = $("<tr><th></th><th></th></tr>");
				table.append(row);
				
				//adding restaurant details to table
				var tr = $("<tr></tr>");
				var td1 = $("<td>Name of the Restaurant  </td>");
				var td2 = $("<td>"+data.name+ "</td>");
				tr.append(td1);
				tr.append(td2);
				table.append(tr);
				
				var tr = $("<tr></tr>");
				var td1 = $("<td>Address</td>");
				var td2 = $("<td>"+data.address+ "</td>");
				tr.append(td1);
				tr.append(td2);
				table.append(tr);
				
				var tr = $("<tr></tr>");
				var td1 = $("<td>Phone</td>");
				var td2 = $("<td>"+data.phone+ "</td>");
				tr.append(td1);
				tr.append(td2);
				table.append(tr);
				
				var tr = $("<tr></tr>");
				var td1 = $("<td>Price Range(Out of 5)</td>");
				var td2 = $("<td>"+data.price+ "</td>");
				tr.append(td1);
				tr.append(td2);
				table.append(tr);
				
				var tr = $("<tr></tr>");
				var td1 = $("<td>City</td>");
				var td2 = $("<td>"+data.city+ "</td>");
				tr.append(td1);
				tr.append(td2);
				table.append(tr);
				
				var tr = $("<tr></tr>");
				var td1 = $("<td>Area</td>");
				var td2 = $("<td>"+data.area+ "</td>");
				tr.append(td1);
				tr.append(td2);
				table.append(tr);
				
				
				var tr = $("<tr></tr>");
				var td1 = $("<td>State</td>");
				var td2 = $("<td>"+data.state+ "</td>");
				tr.append(td1);
				tr.append(td2);
				table.append(tr);
				
				var tr = $("<tr></tr>");
				var td1 = $("<td>Country</td>");
				var td2 = $("<td>"+data.country+ "</td>");
				tr.append(td1);
				tr.append(td2);
				table.append(tr);
				
				var tr = $("<tr></tr>");
				var td1 = $("<td>Postal Code</td>");
				var td2 = $("<td>"+data.postal_code+ "</td>");
				tr.append(td1);
				tr.append(td2);
				table.append(tr);
				
				$("#test").append(table);
				
				
				
				//creating image
				var image = document.createElement("img");
				
				image.setAttribute('src',data.image_url);
				document.getElementById("test").appendChild(image);
	}
	}
	
	function response()
	{
		if (this.status === 200) 
		{
			var data = this.response;
			console.log(data);
			
			//creating table
			var table = $("<table></table>");
			var row = $("<tr><th>Restaurant Name</th><th>Address</th><th>City</th><th>State</th><th> Contact </th><th> Postal Code </th><th> Link </th><th> ID </th></tr>");
			table.append(row);
			for (var i=0;i<data.restaurants.length;i++)
			{  
				//creating table data
				var tr = $("<tr></tr>");
				var tdname = $("<td>" +data.restaurants[i].name+"</td>");
				var tdaddr = $("<td>"+data.restaurants[i].address+ "</td>");
				var tdcity = $("<td>"+data.restaurants[i].city+ "</td>");
				var tdstate = $("<td>"+data.restaurants[i].state+ "</td>");
				var tdphn = $("<td>"+data.restaurants[i].phone+ "</td>");
				var tdcode = $("<td>"+data.restaurants[i].postal_code+ "</td>");
				var tdid = $("<td><button "+" id="+data.restaurants[i].id+" onclick="+"clickonlink(this.id)>Click To View</button>"+"</td>");			
				var objid = $("<td>"+data.restaurants[i].id+ "</td>");
				
				//adding tabledata to tablerow
				tr.append(tdname);
				tr.append(tdaddr);
				tr.append(tdcity);
				tr.append(tdstate);
				tr.append(tdphn);
				tr.append(tdcode);
				tr.append(tdid);
				tr.append(objid);
				
				//adding tablerow to table
				table.append(tr);
				
				/*var btn = document.createElement("a");
				var text = document.createTextNode("Click To View");
				btn.appendChild(text);
				btn.id = objid;
				btn.setAttribute('href',"https://opentable.herokuapp.com/api/restaurants?id="+objid);
				//btn.href = "https://opentable.herokuapp.com/api/restaurants?id=";
				document.getElementById("display").appendChild(btn);*/
				
			}
			//adding table to div with id="display" 
			$("#display").append(table);
			
		}
	}
	
	
$("#getreviews").on("click",clickHandler);
	
	function clickHandler(){
		var id = $("#restaurantid").val();
			$.get("/getreviews", function(response){
				console.log(response);
		var flag = 0;
			for (var i=0;i<response.length;i++)
			{  
				
				var obj = response[i].restaurantid;
				var obj1 = response[i].review;
				
				obj = obj.replace(/\s/g, "");
				
				if(id == obj)
				{
					flag = 1
					document.getElementById("test1").innerHTML += obj + " ";
					document.getElementById("test1").innerHTML += obj1 + "<br>";
				
				}
			}
				if(flag == 0)
					{
						document.getElementById("norev").innerHTML = "No Reviews";
					}
			
		});
	}
