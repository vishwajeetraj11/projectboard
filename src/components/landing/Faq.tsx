import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { Faqs } from 'shared/staticData';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			// flexBasis: '33.33%',
			flexBasis: '80%',
			flexShrink: 0,
		},
		secondaryHeading: {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary,
		},
	}),
);

export const Faq = () => {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState<string | false>(false);

	const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<div className={classes.root}>
			<div className="px-12 pb-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-4">
				<h2 className="text-center font-bold text-3xl text-gray-700 mb-6">
					FAQs
				</h2>
				{React.Children.toArray(Faqs.map((faq: any, index: number) => (
					<Accordion className='shadow-small' expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1bh-content"
							id={`panel${index}bh-header`}
						>
							<Typography className={classes.heading}>{faq.question}</Typography>
							{/* <Typography className={classes.secondaryHeading}>Secondary Heading</Typography> */}
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								{faq.ans}
							</Typography>
						</AccordionDetails>
					</Accordion>
				)))}
			</div>
		</div>
	);
};
