import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title = "About Us">
        <div className="row about p-4">
          <div className="col-md-6">
            <img src="/images/about.png" alt="about" style={{ width:"100%"}} srcset="" />
          </div>
          <div className="col-md-4 mt-2">
            <p className='text-justify'>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
            </p>
          </div>
        </div>
    </Layout>
  )
}

export default About
