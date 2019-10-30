const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

getData('http://api.icndb.com/jokes/random/10')
.then(data => console.log(data))
.catch(err => console.log(err))
