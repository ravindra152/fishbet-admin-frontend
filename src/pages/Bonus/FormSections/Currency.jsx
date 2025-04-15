/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { CustomInputField } from '../../../helpers/customForms';
import {
	getBonusCurrencyConversions,
	resetBonusCurrencyConversion,
} from '../../../store/actions';
import { bonusEnableCurrencies, convertAmountOptions, defaultDepositTypes } from '../constants';
import { showToastr } from '../../../utils/helpers';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { getCreateBonusInitialValues } from '../formDetails';
import { defaultCurrencyCode } from '../../../constants/config';

const Currencies = ({
	selectedBonus,
	allFields,
	setAllFields,
	setActiveTab,
	nextPressed,
	setNextPressed,
	bonusTypeChanged,
	setBonusTypeChanged,
	bonusDetails,
  activeTab,
}) => {
	const dispatch = useDispatch();
	const [nextTab, setNextTab] = useState('');
	const [isNextButtonActive, setNextButtonActive] = useState(false);
	const { bonusCurrencies, bonusCurrenciesFetched, isLoading } = useSelector(
		(state) => state.AllBonusDetails
	);

	const handleSubmit = ({ values, nextTabId }) => {
		setAllFields((prev) => ({ ...prev, currency: values }));
		setActiveTab(nextTabId);
		window.scrollTo(0, 0);
	};

	const { validation } = useForm({
		initialValues: getCreateBonusInitialValues()?.currency,
		onSubmitEntry: (values) => handleSubmit({ values, nextTabId: nextTab }),
	});

	useEffect(() => {
		if (bonusDetails) {
			validation.setValues(bonusDetails.currency);
			setNextButtonActive(true);
		}
	}, [bonusDetails]);

	useEffect(() => {
		if (bonusTypeChanged) {
			setBonusTypeChanged(false);
			validation.resetForm();
		}
	}, [bonusTypeChanged]);

	useEffect(() => {
		const isAnyErrors = document.getElementById('error-container');
		if (nextPressed.currentTab === 'currency') {
			if (typeof isAnyErrors !== 'undefined' && isAnyErrors != null) {
				showToastr({
					message: 'Please fill every required field',
					type: 'error',
				});
			} else if (!isNextButtonActive) {
				showToastr({
					message: 'Please generate currency conversions',
					type: 'error',
				});
			} else {
				setNextTab(nextPressed.nextTab);
				setNextPressed({});
			}
		}
	}, [nextPressed]);

	useEffect(() => {
		if (nextTab) {
			validation.submitForm();
			setNextTab('');
		}
	}, [nextTab]);

	const fetchData = async () => {
		const code = Object.keys(validation?.values)?.[0] || defaultCurrencyCode;
		const maxBonusThreshold = validation?.values?.[code]?.maxBonusThreshold;
		const minDeposit = validation?.values?.[code]?.minDeposit;
		const maxWinAmount = validation?.values?.[code]?.maxWinAmount;
		const zeroOutThreshold = validation?.values?.[code]?.zeroOutThreshold;
		const minBalance = validation?.values?.[code]?.minBalance;
		const joiningAmount = validation?.values?.[code]?.joiningAmount;
    const birthday = validation?.values?.[code]?.birthday;
    const deposit = validation?.values?.[code]?.deposit;

		if (
			allFields?.bonusType !== 'freespins' &&
			allFields?.bonusType !== 'cashfreespins' &&
			allFields?.bonusType !== 'joining' &&
      allFields?.bonusType !== 'birthday' &&
      allFields?.bonusType !== 'deposit'
		) {
			if (
				maxBonusThreshold === '' &&
				!['balance', 'wagering'].includes(allFields.bonusType)
			) {
				showToastr({ message: 'Enter Max Bonus Claimed', type: 'error' });
			} else if (minBalance === '' && allFields?.bonusType === 'wagering') {
				showToastr({ message: 'Enter Min Balance', type: 'error' });
			} else if (
				minDeposit === '' &&
				allFields.bonusType !== 'balance' &&
				allFields?.bonusType !== 'wagering'
			) {
				showToastr({ message: 'Enter Min Deposit', type: 'error' });
			} else if (
				maxWinAmount === '' &&
				allFields.bonusType !== 'balance' &&
				allFields?.bonusType !== 'wagering'
			) {
				showToastr({ message: 'Enter Max Win Amount', type: 'error' });
			} else if (zeroOutThreshold === '' && allFields.bonusType !== 'balance') {
				showToastr({ message: 'Enter Zero Out Threshold', type: 'error' });
			} else {
				setNextButtonActive(true);
				dispatch(
					getBonusCurrencyConversions({
						currencyFields: {
							maxBonusThreshold: maxBonusThreshold || 0,
							minDeposit: minDeposit || 0,
							maxWinAmount: maxWinAmount || 0,
							zeroOutThreshold: zeroOutThreshold || 0,
							minBalance: minBalance || 0,
						},
						currencyCode: code,
					})
				);
			}
		} else if (allFields?.bonusType === 'joining') {
			if (joiningAmount === '') {
				showToastr({ message: 'Enter Joining Amount ', type: 'error' });
			} else {
				setNextButtonActive(true);
				dispatch(
					getBonusCurrencyConversions({
						currencyFields: {
							joiningAmount: joiningAmount || 0,
						},
						currencyCode: code,
					})
				);
			}
		} else if (allFields?.bonusType === 'birthday') {
			if (birthday === '') {
				showToastr({ message: 'Enter Birthday Amount ', type: 'error' });
			} else {
				setNextButtonActive(true);
				dispatch(
					getBonusCurrencyConversions({
						currencyFields: {
							birthday: birthday || 0,
						},
						currencyCode: code,
					})
				);
			}
		} else if (allFields?.bonusType === 'deposit') {
			if (deposit === '') {
				showToastr({ message: 'Enter Deposit Amount ', type: 'error' });
			} else {
				setNextButtonActive(true);
				dispatch(
					getBonusCurrencyConversions({
						currencyFields: deposit || defaultDepositTypes,
						currencyCode: code,
					})
				);
			}
		} else if (maxWinAmount === '') {
			showToastr({ message: 'Enter Max Win Amount', type: 'error' });
		} else if (
			zeroOutThreshold === '' &&
			(allFields?.isSticky === 'true' || allFields?.isSticky)
		) {
			showToastr({ message: 'Enter Zero Out Threshold', type: 'error' });
		} else {
			setNextButtonActive(true);
			dispatch(
				getBonusCurrencyConversions({
					currencyFields: {
						maxBonusThreshold: maxBonusThreshold || 0,
						minDeposit: minDeposit || 0,
						maxWinAmount: maxWinAmount || 0,
						zeroOutThreshold: zeroOutThreshold || 0,
						minBalance: minBalance || 0,
					},
					currencyCode: code,
				})
			);
		}
	};

	useEffect(() => {
		if (bonusCurrenciesFetched) {
			validation.setValues(bonusCurrencies);
			dispatch(resetBonusCurrencyConversion());
		}
	}, [bonusCurrenciesFetched]);

  useEffect(() => {
		if (activeTab === 'currency' && !Object.keys(validation.values)?.length) {
			fetchData();
		}
	}, [activeTab]);

	return (
		<>
			<Row className="d-flex justify-content-end align-items-end my-4">
				<Col sm={3}>
					<Button
						type="submit"
						className="float-end"
						onClick={() => fetchData()}
						title="Fetch Currency"
					>
            <span className='d-flex align-items-center'>Currency
              {isLoading ?
                <i className="bx bx-hourglass bx-spin font-size-16 align-middle me-2" />
                : <i className="dripicons-swap ps-2"></i>
              }
            </span>
					</Button>
				</Col>
			</Row>
			{validation &&
				validation?.values &&
				Object.keys(validation?.values).length > 0 &&
				Object.keys(validation?.values).map((key, index) => {
          if(!bonusEnableCurrencies?.[allFields?.bonusType]?.includes(key)) return;
          return (
            <Row>
              <Col className="mb-3">
                <CustomInputField
                  label={'Currency'}
                  value={key}
                  disabled
                />
              </Col>
              {Object.keys(validation?.values[key]).map((currKey, currIndex) => {
                let hide = false;
                let validationError = false;
                if (
                  currKey !== 'minBalance' &&
                  !validation?.values[key][currKey]
                ) {
                  validationError = true;
                } else {
                  validationError = false;
                }

                if (selectedBonus === 'wagering') {
                  hide =
                    currKey === 'minDeposit' ||
                    currKey === 'maxBonusThreshold' ||
                    currKey === 'maxWinAmount';
                } else if (selectedBonus === 'joining') {
                  hide = currKey !== 'joiningAmount';
                } else if (
                  selectedBonus === 'freespins' ||
                  selectedBonus === 'cashfreespins'
                ) {
                  hide =
                    currKey !== 'maxWinAmount' && currKey !== 'zeroOutThreshold';
                } else if (
                  selectedBonus === 'deposit'
                ) {
                  hide =
                    !['1', '2', '3', '4', '5'].includes(currKey);
                } else {
                  hide = currKey === 'joiningAmount' || currKey === 'minBalance';
                }

                return (
                  currKey !== 'minBonusThreshold' &&
                  !hide && (
                    <Col
                      className="px-1 text-center"
                      key={`currencyCols ${currIndex + 1}`}
                      hidden={hide}
                    >
                      {!hide && (
                        <label htmlFor={currKey} style={{ fontSize: '14px' }}>
                          {['wagering'].includes(allFields?.bonusType)
                            ? convertAmountOptions?.find((val) =>
                                currKey === 'minBalance'
                                  ? val.value === 'minBalanceCash'
                                  : val.value === currKey
                              )?.label
                            : convertAmountOptions?.find(
                                (val) => val.value == currKey
                              )?.label}
                          <span className="text-danger"> *</span>
                        </label>
                      )}
                      <CustomInputField
                        name={`[${key}][${currKey}]`}
                        value={validation?.values[key][currKey]}
                        hidden={hide}
                        onBlur={validation?.handleBlur}
                        onChange={(e) => {
                          validation?.handleChange(e);
                          if(['deposit'].includes(allFields?.bonusType)) setAllFields((prev) => ({ ...prev, currency: { ...validation.values, [key]: { ...validation.values?.[key], [currKey]: parseFloat(e.target.value) } }}));
                          else setAllFields((prev) => ({ ...prev, currency: { ...validation.values, [key]: { [currKey]: e.target.value } }}));
                        }}
                        type="number"
                        required
                      />
                      {validationError && (
                        <span
                          value={`[${key}][${currKey}]`}
                          id="error-container"
                          className="text-danger"
                        >
                          Required *
                        </span>
                      )}
                    </Col>
                  )
                );
              })}
            </Row>
				)})}
		</>
	);
};

Currencies.defaultProps = {};
export default Currencies;
