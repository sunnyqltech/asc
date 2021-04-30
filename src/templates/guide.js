import React, {Component} from 'react';
import { graphql,Link } from "gatsby"
import PropTypes from "prop-types"
import {Container,Breadcrumb} from 'react-bootstrap'
import {Image,ListGroup,Form,InputGroup,FormControl,Button,Tab,Nav} from 'react-bootstrap'
import {Row,Col,Card} from 'react-bootstrap'
import Layout from "../components/layout"
import Footer from "../components/common/Footer"
import BottomForm from "../components/common/BottomForm"
import imgbox1 from '../images/blog-imgbox-1.png'
import imgbox2 from '../images/blog-imgbox-2.png'
import imgbox3 from '../images/blog-imgbox-3.png'
import imgbox4 from '../images/blog-imgbox-4.png'
import sidebaradd1 from '../images/sidebar-add-1.png'
import sidebaradd2 from '../images/sidebar-add-2.png'
import { FaSearch } from "react-icons/fa";
import { Helmet } from "react-helmet"
class demopage extends Component {
  render() {
    const blog = this.props.data.allWordpressWpCpt150461
   	const category = this.props.data.allWordpressCategory
   
   
    return (
		<Layout>
		<Helmet>
				<title>Guides - School Hoilday Programs | Australian Sports Camps</title>
				<meta name="title" content="Guides - School Hoilday Programs | Australian Sports Camps"></meta>
				<meta property="og:title" content="Guides - School Hoilday Programs | Australian Sports Camps"></meta>
				<meta property="twitter:title" content="Guides - School Hoilday Programs | Australian Sports Camps"></meta>

				<meta name="description" content="Discover our guides for the latest sports techniques, tips, and drills for sports skills development. Sports holiday camps for all major sports in Australia."></meta>
				<meta property="og:description" content="Discover our guides for the latest sports techniques, tips, and drills for sports skills development. Sports holiday camps for all major sports in Australia."></meta>
				<meta property="twitter:description" content="Discover our guides for the latest sports techniques, tips, and drills for sports skills development. Sports holiday camps for all major sports in Australia."></meta>

				<meta name="keywords" content="Sports Guides, Sports Guides for kids, Sports Guides for beginners, Sports techniques, Cricket skills, cricket rules, Netball skills, Sports Holiday camps Australia, Sports Skills & Development"></meta>

				<meta property="og:type" content="website"></meta>
				<meta property="twitter:card" content="summary_large_image"></meta>


			</Helmet>
			<section className="Banner-Section">
                <Container>
                    <div className="Banner-Section-data">
                    <Breadcrumb>
                        <Breadcrumb.Item className="">
                            <Link className="nav-link p-0" to="/">Home</Link>
                            </Breadcrumb.Item>
						<Breadcrumb.Item className="">
									<Link className="nav-link p-0" to="/resources">Resources</Link>
								</Breadcrumb.Item>	
								<Breadcrumb.Item active className="">
									<Link className="nav-link p-0" to="/guide">Guide</Link>
								</Breadcrumb.Item>			
							
							
						
                    </Breadcrumb>
                    <h2 className="heading-banner">Guides</h2>
                    </div>
                </Container>
            </section>
			<section className="Resource-section-2">
                <Container>
                    <div className="Resource-Section-2-data">
						<Tab.Container id="left-tabs-example" defaultActiveKey="Blog">
							<div className="p-0 border-0 justify-content-center d-flex mb-30">
								<Nav variant="pills" className="">
									<Nav.Item>
										<Nav.Link  href="/resources" className="uppercase font-bold">All</Nav.Link>
									</Nav.Item>
									 <Nav.Item>
										<Nav.Link  href="/blog" className="uppercase font-bold">Blogs</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link href="/videos" className="uppercase font-bold">Videos</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link href="/guide" className="uppercase font-bold nav-link active">Guides</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link href="/flyer" className="uppercase font-bold">Camp flyer</Nav.Link>
									</Nav.Item>
								</Nav>
							</div>
							<Tab.Content className="text-left">
								<Tab.Pane eventKey="Blog">
									<section className="Resource-guides">
										<Container>
											<div className="Resource-guides-data">
												<Row className="">
													
													{blog && blog.edges.map( prop => {
														return (
															<Col xl={4} lg={4} md={6} className="mb-30 resource-card-col">
																<Card className="resource-card mb-0 all">
																	<Link to={"/guide/"+prop.node.slug} className="card-img">
																		<Image src={prop.node.acf.featured_image} fluid alt="" className="" />
																	</Link>
																	<Card.Body>
																		<Card.Title as="h5" dangerouslySetInnerHTML={{ __html: prop.node.title.substring(0, 80)+"...."}}  />
																		<Card.Text as="div" className="" dangerouslySetInnerHTML={{ __html: prop.node.content.substring(0, 90)+"..."}} />
																		<Link className="nav-link p-0 d-flex align-items-center" to={"/guide/"+prop.node.slug}>Read more 
																			<i className="fa fa-chevron-right ml-2"></i> 
																		</Link>
																	</Card.Body>
																</Card>
															</Col>	
														)
													})}
												</Row>
												<Col xl={12} lg={12} md={12} sm={12}  className="">
													{(this.props.pageContext.previousPagePath !== "") ? (<Link className="btn uppercase btn-sm btn-orange"  to={this.props.pageContext.previousPagePath}>Previous</Link>) : (<Link className="btn btn-primary invisible"  to={this.props.pageContext.previousPagePath}>Previous</Link>)}
				
				
													{(this.props.pageContext.nextPagePath !== "") ? (<Link className="btn uppercase btn-sm btn-orange next-btnblog" to={this.props.pageContext.nextPagePath}>Next</Link>) : (<Link className="btn btn-primary invisible" to={this.props.pageContext.nextPagePath}>Next</Link>)}
												</Col>
											</div>
										</Container>
									</section>
								</Tab.Pane>
							</Tab.Content>
						</Tab.Container>
                    </div>
                </Container>
            </section>
			
			<BottomForm/>
			<Footer/>
			 
		 
		</Layout>
	)
	}}

demopage.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default demopage


export const pageQuery = graphql`
	query($skip: Int!, $limit: Int!) {
		allWordpressWpCpt150461(skip: $skip, limit: $limit) {
		edges {
			node {
				id
				acf {
					featured_image
					author_name
				}
				
				slug
				title
				date(formatString: "D MMMM, Y")
				content
			}
		}
	}
	allWordpressCategory {
		edges {
			node {
				id
				name
				slug
				count
			}
		}
	}
  }
  
`

