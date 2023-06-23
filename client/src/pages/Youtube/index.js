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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function YoutubePage() {
	const [youtubeInput, setYoutubeInput] = useState(undefined);

	const navigate = useNavigate();

	const submitYoutubeLink = () => {
		navigate(`${youtubeInput}`);
	};

	const handleInputChange = (event) => {
		setYoutubeInput(event.target.value);
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
						Enter Youtube livestream link for classifying the
						livechat
					</Typography>
					<FormControl
						variant='outlined'
						fullWidth>
						<InputLabel>Fill livestream link here</InputLabel>
						<OutlinedInput
							type='text'
							onChange={handleInputChange}
							value={youtubeInput}
							label={'Fill livestream link here'}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										edge='end'
										onClick={
											submitYoutubeLink
										}>
										<East color='primary' />
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
				</Box>
			</Box>
		</Container>
	);
}
