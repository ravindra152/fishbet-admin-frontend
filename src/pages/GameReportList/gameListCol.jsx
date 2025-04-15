// import React from 'react';
// import { Badge } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const IdValue = ({ cell }) => cell.value ?? '';

const NAME = ({ cell }) => cell.value ?? '';

const NUMBEROFROUNDS = ({ cell }) => cell.value ?? '';

const NUMBERFPLAYER = ({ cell }) => cell.value ?? '';

const TOTALBETSGAME = ({ cell }) => parseInt(cell?.value, 10)?.toFixed(2) ?? '';

const TOTALWINS = ({ cell }) => parseInt(cell?.value, 10)?.toFixed(2) ?? '';
const GAMEREVENUE = ({ cell }) => parseInt(cell?.value, 10)?.toFixed(2) ?? '';
const PAYOUT = ({ cell }) => cell.value ?? '';
const CURRENCY = ({ cell }) => cell.value ?? '';

export {
	IdValue,
	NAME,
	NUMBEROFROUNDS,
	NUMBERFPLAYER,
	TOTALBETSGAME,
	TOTALWINS,
	GAMEREVENUE,
	PAYOUT,
  CURRENCY
};
