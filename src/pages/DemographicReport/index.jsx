/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardBody, UncontrolledTooltip, Container } from 'reactstrap';
import GraphicChart from './GraphicChart';
import DemoGraphicTable from './DemoGraphicTable';
import { dateConstants } from './constant';
import useDemographicReport from './hooks/useDemographicReport';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { withTranslation } from 'react-i18next';

const DemographicReport = ({ t }) => {
	const {
		demoGrapFormatedData,
		demoGraphOptions,
		demoGraphicData,
		demoGraphColumn,
		demoDateOptions,
		setDemoDateOptions,
		isDemographicLoading,
		exportReport,
	} = useDemographicReport();

	return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title={t('Demographics')} breadcrumbItem={t('Demographic Report')} />
        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
                <div className="float-start">
                  <div className="d-flex justify-content-between align-items-center">
                    <select
                      value={demoDateOptions}
                      className="form-select me-2"
                      onChange={(e) => {
                        setDemoDateOptions(e.target.value);
                      }}
                    >
                      {dateConstants?.map((item) => (
                        <option value={item.value} key={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="float-end">
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      type="button"
                      id="demograph-export-tool"
                      className="btn btn-primary"
                      onClick={exportReport}
                    >
                      <i className="bx bx-download align-baseline" />
                    </button>
                    <UncontrolledTooltip target="demograph-export-tool">
                      Export Details
                    </UncontrolledTooltip>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
                  <Row>
                    <Col>
                      <GraphicChart
                        demoGrapFormatedData={demoGrapFormatedData}
                        demoGraphOptions={demoGraphOptions}
                      />
                    </Col>
                  </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <DemoGraphicTable
                      demoGraphicData={demoGraphicData}
                      demoGraphColumn={demoGraphColumn}
                      isDemographicLoading={isDemographicLoading}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
	);
};
DemographicReport.propTypes = {
	demoGraphOptions: PropTypes.arrayOf(PropTypes.any),
	demoGraphicData: PropTypes.arrayOf(PropTypes.any),
	demoGraphColumn: PropTypes.arrayOf(PropTypes.any),
	demoDateOptions: PropTypes.arrayOf(PropTypes.any),
	setDemoDateOptions: PropTypes.func,
	isDemographicLoading: PropTypes.bool,
	demoGrapFormatedData: PropTypes.arrayOf(PropTypes.any),
	exportReport: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};
DemographicReport.defaultProps = {
	demoGraphOptions: PropTypes.arrayOf(PropTypes.any),
	demoGraphicData: PropTypes.arrayOf(PropTypes.any),
	demoGraphColumn: PropTypes.arrayOf(PropTypes.any),
	demoDateOptions: PropTypes.arrayOf(PropTypes.any),
	setDemoDateOptions: PropTypes.func,
	isDemographicLoading: PropTypes.bool,
	demoGrapFormatedData: PropTypes.arrayOf(PropTypes.any),
  t: PropTypes.func.isRequired,
};
export default withTranslation()(DemographicReport);
