import { East } from '@mui/icons-material';
import {
	Box,
	Container,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Typography,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function HomePage() {
	const { register, handleSubmit, watch } = useForm();
	const [textInput, setTextInput] = useState();
	const [predictedLabel, setPredictedLabel] = useState([]);

	const onSubmit = async (data) => {
		const fetchData = watch(data);
		const config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://127.0.0.1:5000/api',
			headers: {
				'Content-Type': 'application/json',
			},
			data: fetchData,
		};

		await axios
			.request(config)
			.then((response) => {
				setPredictedLabel(response.data.data.label);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleChange = (event) => {
		setTextInput(event.target.value);
	};

	return (
		<Container>
			<Box
				width={'100%'}
				height={'93vh'}
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}>
				<Box width={'100%'}>
					<Typography
						component={'h2'}
						variant={'h3'}
						textAlign={'center'}
						marginBottom={'3rem'}>
						Enter your text to classify the target
					</Typography>
					<FormControl
						onSubmit={handleSubmit(onSubmit)}
						variant='outlined'
						fullWidth>
						<InputLabel>Fill your text here</InputLabel>
						<OutlinedInput
							type='text'
							label={'Fill your text here'}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										edge='end'
										onClick={onSubmit}>
										<East color='primary' />
									</IconButton>
								</InputAdornment>
							}
							onChange={handleChange}
							value={textInput}
							{...register('message')}
						/>
					</FormControl>
					<Box
						display={'flex'}
						flexDirection={'row'}
						marginTop={'3rem'}>
						<Typography
							component={'h2'}
							variant={'h5'}
							textAlign={'left'}>
							Prediction:
						</Typography>
						<Box
							display={'flex'}
							flexDirection={'column'}
							marginLeft={'1rem'}>
							{predictedLabel.map((label, key) => (
								<Typography
									component={'h3'}
									variant={'h6'}
									textTransform={'capitalize'}
									textAlign={'left'}
									key={key}>
									{label}
								</Typography>
							))}
						</Box>
					</Box>
				</Box>
			</Box>
		</Container>
	);
}
