/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Card, CardBody, Row } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import DivLoader from '../../../components/Common/Loader/divLoader';

/* eslint-disable import/prefer-default-export */

const NoDataLoggedInContainer = styled.div`
	margin: 0px auto;
	color: white;
	padding-top: 30px;
	height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const LoggedInPlayer = (props) => {
	const { loggedInOptions, isLivePlayerLoading } = props;
	return (
		<Row>
			<Col xl="12">
				<Card>
					<CardBody>
						<h4 className="card-title mb-4">Device Login Stats</h4>

						<div>
							<div id="donut-chart">
								{!isLivePlayerLoading &&
									loggedInOptions?.series?.length > 0 && (
										<ReactApexChart
											options={loggedInOptions}
											series={loggedInOptions.series}
											type="donut"
											height={160}
											className="apex-charts"
										/>
									)}
								{isLivePlayerLoading && (
									<NoDataLoggedInContainer>
										<DivLoader isSmall={false} loaderVarient="text-secondary" />
									</NoDataLoggedInContainer>
								)}
							</div>
						</div>

						{/* <div className="text-center text-muted">
              <Row>
                <Col xs="4">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-primary me-1" /> Product A
                    </p>
                    <h5>$ 2,132</h5>
                  </div>
                </Col>
                <Col xs="4">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-success me-1" /> Product B
                    </p>
                    <h5>$ 1,763</h5>
                  </div>
                </Col>
                <Col xs="4">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-danger me-1" /> Product C
                    </p>
                    <h5>$ 973</h5>
                  </div>
                </Col>
              </Row>
            </div> */}
					</CardBody>
				</Card>
			</Col>
			{/* <Col xl="12">
        <Card>
            <CardBody>
              <h4 className="card-title mb-4">Total Player Stats</h4>
              <div>
                <div id="donut-chart">
                  <ReactApexChart
                    options={playerGraphoptions}
                    series={playerGraphoptions.series || []}
                    type="donut"
                    height={160}
                    className="apex-charts"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
      </Col> */}
		</Row>
	);
};

export default LoggedInPlayer;
