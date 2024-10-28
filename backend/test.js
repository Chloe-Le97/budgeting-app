const R = require('ramda')

const expensesAll = [
    {
      "id": 24,
      "money": -15,
      "text": "",
      "category": null,
      "userId": 4,
      "assetId": 14,
      "categoryId": 2744,
      "isAssetUpdate": false,
      "transactionId": "f08896fc-de1e-4ba0-9d27-d32e94453309",
      "updatedAt": "2024-09-25T19:00:28.261Z",
      "createdAt": "2024-09-25T17:55:43.533Z"
    },
    {
      "id": 26,
      "money": -75,
      "text": "Pet insurance ",
      "category": null,
      "userId": 4,
      "assetId": 14,
      "categoryId": 2393,
      "isAssetUpdate": false,
      "transactionId": "e5b6556d-a450-4a9b-a823-cb64d729edda",
      "updatedAt": "2024-09-26T22:19:39.235Z",
      "createdAt": "2024-09-26T22:19:39.235Z"
    },
    {
      "id": 27,
      "money": -7,
      "text": "Starbucks",
      "category": null,
      "userId": 4,
      "assetId": 14,
      "categoryId": 2394,
      "isAssetUpdate": false,
      "transactionId": "b5ef5154-6c1c-4fd0-9c55-43910638b76b",
      "updatedAt": "2024-10-12T22:57:55.714Z",
      "createdAt": "2024-10-12T22:57:55.714Z"
    },
    {
      "id": 32,
      "money": -2000,
      "text": "Transfer money",
      "category": "Transfer",
      "userId": 4,
      "assetId": 14,
      "categoryId": null,
      "isAssetUpdate": false,
      "transactionId": "219443d5-6d18-4643-8739-f3cfd6ac9f6a",
      "updatedAt": "2024-10-14T13:51:53.002Z",
      "createdAt": "2024-10-14T13:51:53.002Z"
    },
    {
      "id": 33,
      "money": 2000,
      "text": "Receive money",
      "category": "Transfer",
      "userId": 4,
      "assetId": 17,
      "categoryId": null,
      "isAssetUpdate": false,
      "transactionId": "219443d5-6d18-4643-8739-f3cfd6ac9f6a",
      "updatedAt": "2024-10-14T13:51:53.023Z",
      "createdAt": "2024-10-14T13:51:53.023Z"
    },
    {
      "id": 34,
      "money": -265,
      "text": "",
      "category": null,
      "userId": 4,
      "assetId": 14,
      "categoryId": 2399,
      "isAssetUpdate": false,
      "transactionId": "81c46726-8dbc-4729-ae7f-695ff00330e5",
      "updatedAt": "2024-10-14T13:53:10.500Z",
      "createdAt": "2024-10-14T13:53:10.500Z"
    },
    {
      "id": 31,
      "money": -11,
      "text": "Paper",
      "category": null,
      "userId": 4,
      "assetId": 14,
      "categoryId": 2384,
      "isAssetUpdate": false,
      "transactionId": "c120d812-5bd2-4361-84b9-8c8c3f0d2005",
      "updatedAt": "2023-10-14T07:28:42.587Z",
      "createdAt": "2023-10-14T07:28:42.587Z"
    },
    {
      "id": 9,
      "money": -50,
      "text": "HSL ticket",
      "category": null,
      "userId": 4,
      "assetId": 14,
      "categoryId": 2383,
      "isAssetUpdate": false,
      "transactionId": "05cad2e4-f1f3-40de-aa1a-10f7cd482a25",
      "updatedAt": "2024-09-23T16:20:13.271Z",
      "createdAt": "2024-09-19T16:18:43.518Z"
    },
    {
      "id": 10,
      "money": -50,
      "text": "Transfer money",
      "category": "Transfer",
      "userId": 4,
      "assetId": 14,
      "categoryId": null,
      "isAssetUpdate": false,
      "transactionId": "472cbeb7-967c-42e8-afa8-d600c6affbd9",
      "updatedAt": "2024-09-23T16:20:13.281Z",
      "createdAt": "2024-09-19T16:38:33.746Z"
    },
    {
      "id": 12,
      "money": 2000,
      "text": "Salary",
      "category": null,
      "userId": 4,
      "assetId": 14,
      "categoryId": 2397,
      "isAssetUpdate": false,
      "transactionId": "5594c24d-9aa5-484b-b7a4-ccbc342eea30",
      "updatedAt": "2024-09-23T16:20:13.304Z",
      "createdAt": "2024-09-19T16:45:09.271Z"
    },
    {
      "id": 11,
      "money": 50,
      "text": "Receive money",
      "category": "Transfer",
      "userId": 4,
      "assetId": 17,
      "categoryId": null,
      "isAssetUpdate": false,
      "transactionId": "472cbeb7-967c-42e8-afa8-d600c6affbd9",
      "updatedAt": "2024-09-23T16:20:13.298Z",
      "createdAt": "2024-09-19T16:38:33.758Z"
    },
    {
      "id": 15,
      "money": -50,
      "text": "Transfer money",
      "category": "Transfer",
      "userId": 4,
      "assetId": 14,
      "categoryId": null,
      "isAssetUpdate": false,
      "transactionId": "b9c88d2a-861c-4109-addb-dc833d1816fb",
      "updatedAt": "2024-09-23T16:25:01.329Z",
      "createdAt": "2024-09-23T16:25:01.329Z"
    },
    {
      "id": 16,
      "money": 50,
      "text": "Receive money",
      "category": "Transfer",
      "userId": 4,
      "assetId": 17,
      "categoryId": null,
      "isAssetUpdate": false,
      "transactionId": "b9c88d2a-861c-4109-addb-dc833d1816fb",
      "updatedAt": "2024-09-23T16:25:01.340Z",
      "createdAt": "2024-09-23T16:25:01.340Z"
    },
    {
      "id": 17,
      "money": -200,
      "text": "Transfer money",
      "category": "Transfer",
      "userId": 4,
      "assetId": 17,
      "categoryId": null,
      "isAssetUpdate": false,
      "transactionId": "1306d6fb-2e10-4641-93b1-19d62443f179",
      "updatedAt": "2024-09-23T17:23:37.937Z",
      "createdAt": "2024-09-23T17:23:37.937Z"
    },
    {
      "id": 18,
      "money": 200,
      "text": "Receive money",
      "category": "Transfer",
      "userId": 4,
      "assetId": 14,
      "categoryId": null,
      "isAssetUpdate": false,
      "transactionId": "1306d6fb-2e10-4641-93b1-19d62443f179",
      "updatedAt": "2024-09-23T17:23:37.950Z",
      "createdAt": "2024-09-23T17:23:37.950Z"
    },
    {
      "id": 21,
      "money": -9,
      "text": "Hsl",
      "category": null,
      "userId": 4,
      "assetId": 14,
      "categoryId": 2383,
      "isAssetUpdate": false,
      "transactionId": "bae86ceb-d898-4d2c-ba2c-5a7a4c7da975",
      "updatedAt": "2024-09-25T17:40:14.671Z",
      "createdAt": "2024-09-24T18:03:22.730Z"
    },
    {
      "id": 22,
      "money": -20,
      "text": "Book",
      "category": null,
      "userId": 4,
      "assetId": 14,
      "categoryId": 2388,
      "isAssetUpdate": false,
      "transactionId": "0556101a-a712-47d0-9379-9649b8235b66",
      "updatedAt": "2024-09-25T17:48:31.604Z",
      "createdAt": "2024-09-25T17:48:31.604Z"
    },
    {
      "id": 23,
      "money": -5,
      "text": "Milktea",
      "category": null,
      "userId": 4,
      "assetId": 14,
      "categoryId": 2394,
      "isAssetUpdate": false,
      "transactionId": "7519c889-d56c-4758-91ef-c9b69b95f62c",
      "updatedAt": "2024-09-25T17:48:46.524Z",
      "createdAt": "2024-09-25T17:48:46.524Z"
    }
  ]

const expenses = expensesAll.filter(item => item.isAssetUpdate == false)

const groupByYear = Object.groupBy(expenses,({createdAt}) => new Date(createdAt).getFullYear())

const reduceFunc = (arr) => {
    return arr.reduce((sumTotal, currentYearItem) =>{
        const {money} = currentYearItem;
        if(money > 0){
            return {...sumTotal, income: sumTotal.income + money }
        }
        return {...sumTotal, expense: sumTotal.expense + Math.abs(money)}
    },{expense:0, income: 0} 
    )
}

const yearlyItems = R.keys(groupByYear).map(year => {
    const yearItems = groupByYear[year]
    const sumYears = reduceFunc(yearItems)
    return  {[year]: sumYears}
})

const monthlyItems = R.keys(groupByYear).reduce((yearObject,year) => {

    const yearItems = groupByYear[year]

    const groupByMonth = Object.groupBy(yearItems,({createdAt}) => new Date(createdAt).getMonth() + 1)

    const groupExpenseByMonth = R.keys(groupByMonth).map(key => {
        const monthItems = groupByMonth[key]
        const sumMonth = reduceFunc(monthItems)
        return {[key]: sumMonth}
    })

 
    const groupExpenseByYear = reduceFunc(yearItems)

    const object = {
        'monthly':groupExpenseByMonth,
        'yearly': groupExpenseByYear
    }
    return {...yearObject, [year]:object}

},{})

console.log(monthlyItems)