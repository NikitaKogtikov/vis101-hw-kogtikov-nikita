 var metaData;
 var interwiev = new Array();

 var notes;
 var start_date = "2013-01-01";
 var stop_date = "2013-12-31";

 queue()
    .defer(d3.json, 'data/MYWorld_fields.json')
	.defer(d3.json, 'data/perDayData.json') 
    .await(allLoaded);
function allLoaded (perDayData, metaData,allData )
{
	
	interview = allData;
	notes = metaData;
	aggregateCountsForRange (start_date, stop_date);

}
function CompareToDates (a,b)
{
	var date1 = new Array();
	var date2 = new Array();
	date1 = a.split("-");
	date2 = b.split("-");
	if (date1[0] > date2[0])
	{
		return 1;
	}
	if (date1[0] < date2[0])
	{
		return -1;
	}
	if (date1[0] == date2[0])
	{
		if (date1[1] > date2[1])
		{
			return 1;
		}
		if (date1[1] < date2 [1])
		{
			return -1;
		}
		if (date1[1] == date2[1])
		{
			if (date1[2] > date2[2])
			{
				return 1;
			}
			if (date1[2] < date2[2])
			{
				return -1;
			}
			if (date1[2] == date2[2])
			{
				return 0;
			}
		}
	}
}
function aggregateCountsForRange (start_date, stop_date)
{
	count = [];
	namesoffields = [];
	
	for (var i=0; i<1000; i++)
	{
		var j = 100 + i;
		
		var str = j.toString();
		
		if (notes.choices[str]== null)
		{
			break;
		}
		
		namesoffields.push (notes.choices[str]);
	}
	
	for (var i = 0; i<interview.length; i++)
	{
		if (((CompareToDates (interview[i].day,start_date)== 1)||(CompareToDates (interview[i].day,start_date)== 0))&&(CompareToDates(interview[i].day,stop_date)== -1)||(CompareToDates(interview[i].day,stop_date) == 0))
		{
			count.push (interview[i]);
		}
	}
		
	DrawPlot(count, namesoffields);
}

 

