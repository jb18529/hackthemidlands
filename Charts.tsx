//import Layout from '../components/Layout'
//import * as d3 from "d3"
//import { useD3 } from '../hooks/useD3';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Category, Purchase, UserData } from './../types/budget'
import { Link } from "react-router-dom";


import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { useUserData } from '../hooks/userContext';

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement);

// Amount budgeted by user
// const userData: UserData = {
//   income: 1234,
//   costByCategory: {
//     [Category.Food]: 123,
//     [Category.Leisure]: 123,
//     [Category.Misc]: 1235,
//     [Category.Utilites]: 234234,
//     [Category.Rent]: 12353,
//     [Category.Transport]: 39084
//   },
//   purchases: [{
//     category: Category.Food,
//     cost: 1277,
//   }, {
//     category: Category.Leisure,
//     cost: 1523,
//   }, {
//     category: Category.Misc,
//     cost: 135,
//   }, {
//     category: Category.Utilites,
//     cost: 24234,
//   }, {
//     category: Category.Rent,
//     cost: 152353,
//   }, {
//     category: Category.Transport,
//     cost: 39384,
//   },

//   ]

// }

// Essentially adds the costs for category Food and outputs the total
// so can be used in spent pie (2nd pie) chart
//Amount spent


export function ReportPage() {
  const userData = useUserData()

  if (!userData || !userData.costByCategory || !userData.income) {
    return (<><Link to='/user/budget'>Go To Split</Link>
      <Link to="/purchase/new">Go To Buy</Link></>)
  }

  const total_spentbycategory = (category: Category) => {
    if (!userData.purchases) {
      return 0
    }

    return userData.purchases.filter((item) => item.category === category).reduce((acc, i) => acc + i.cost, 0)

  }

  const arrayDiff = (a, b) => {
    let diff = [];
    for (let i = 0; i < a.length; i++) {
      diff.push(a[i] - b[i]);
    }
    return diff
  }

  // Will create variable constant that contains categories in order and use later to output in labels

  const categories = Object.values(Category)
  const values_budget = categories.map((category) => userData.costByCategory[category])

  const totals = categories.map((category) => total_spentbycategory(category))
  // 1st pie chart - allocated or budget for each category

  const title_budgeted = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Budgeted',
      },
    },
  }

  const pie_budgeted = {

    labels: categories,
    datasets: [
      {
        label: 'Percentage',
        data: values_budget,
        backgroundColor: [
          'rgba(255, 99, 132, 5.0)',
          'rgba(54, 162, 235, 5.0)',
          'rgba(255, 206, 86, 5.0)',
          'rgba(75, 192, 192, 5.0)',
          'rgba(153, 102, 255, 5.0)',
          'rgba(255, 159, 64, 5.0)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,

      },

    ],

  }



  // 2nd pie chart - how much user has spent 
  const title_spent = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Spent',
      },
    },
  }


  const pie_spent = {

    labels: categories,
    datasets: [
      {
        label: 'Percentage',
        data: totals,
        backgroundColor: [
          'rgba(255, 99, 132, 5.0)',
          'rgba(54, 162, 235, 5.0)',
          'rgba(255, 206, 86, 5.0)',
          'rgba(75, 192, 192, 5.0)',
          'rgba(153, 102, 255, 5.0)',
          'rgba(255, 159, 64, 5.0)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,

      },

    ],

  }

  // Bar chart
  const var_char_labels = Object.values(Category)

  const title_diff = {
    plugins: {
      title: {
        display: true,
        text: 'How Much Have You Spent Out Of Your Budget',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labels = var_char_labels;

  const bar_diff = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: arrayDiff(values_budget, totals),

        backgroundColor: 'rgba(50, 200, 20, 0.5)',
      },
    ],
  };


  return (
    <Container>
      <Row>
        <Col sm={6}><Pie options={title_budgeted} data={pie_budgeted} /></Col>
        <Col sm={6}><Pie options={title_spent} data={pie_spent} /></Col>
      </Row>

      <Row>
        <Col fluid={"sm"}><Bar options={title_diff} data={bar_diff} /></Col>
      </Row>
      {/*<Link to='/user/budget'>Go To Split</Link>
      <Link to="/purchase/new">Go To Buy</Link>*/}
    </Container>
  )
}
