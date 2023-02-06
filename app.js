const createCsvWriter = require('csv-writer').createObjectCsvWriter
const csvWriter = createCsvWriter({
    path: 'file.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'description', title: 'DESCRIPTION'},
        {id: 'html_url', title: 'HTML_URL'},
        {id: 'watchers_count', title: 'WATCHERS_COUNT'},
        {id: 'stargazers_count', title: 'STARGAZERS_COUNT'},
        {id: 'forks_count', title: 'FORKS_COUNT'}
    ]
});

var records = []

const search = async () => {
   try{
        const response = await fetch('https://api.github.com/search/repositories?q=is:public')
        const data =  await response.json()
    
        const validData = data.items.filter((data) => {
                return (data.language === 'Python' || data.forks >= 200)
                })
        validData.map((val)=>{
            if(val.stargazers_count > 2000)
            {
                const record = {
                    name:val.name,
                    description:val.description,
                    html_url:val.html_url,
                    watchers_count:val.watchers_count,
                    stargazers_count:val.stargazers_count,
                    forks_count:val.forks_count
                }
                records.push(record)
            }
            
        })  
        await csvWriter.writeRecords(records)       // returns a promise
            
   }  
   catch(e)
   {
    console.log(e)
   }
    
            
}


search() 
