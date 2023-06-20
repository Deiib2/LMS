import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ItemCard from '../../components/ItemCard';
import { useAuthContext } from '../../hooks/useAuthContext';

const steps = ['Select book', 'Lend/Return', 'Select reader', 'Confirm'];

const Lend = () => {
    const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
    const [item, setItem] = React.useState('');
    const [reader, setReader] = React.useState('');
    const [lend, setLend] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [itemi, setItemi] = React.useState(null);
    const [readeri, setReaderi] = React.useState(null);
    const [returnDate, setReturnDate] = React.useState(Date.now());
    const [success, setSuccess] = React.useState(false);
    const {user} = useAuthContext();

  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if(activeStep === 0) {
        if(item === ''){
            setError('Please enter an ID/ISBN')
            return
        }
        handleFirstStep();
    }
    if(activeStep === 2){
        if(reader === ''){
            setError('Please enter a reader ID')
            return
        }
        handleThirdStep();
    }
    if(activeStep === 3){
        if(lend){
            handleFinalStep();
        }else{
            handleFinalStepReturn();
        }
        
    }
    console.log(lend)
    if(!error){
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    console.log('hiiiii')
    }
    console.log(error)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setSuccess(false)
    setActiveStep(0);
  };

  const handleFirstStep = async () => {
        const response = await fetch('/api/guest/items/'+item)
        const json = await response.json()
        console.log(json)
        if(response.ok){
            setError(null)
            setItemi(json)
        }
        if(!response.ok){
            setError(json.error)
            setItem('')
        }
        // if(response.status === 404){
        //     setError('Please enter a valid ID/ISBN')
        //     setItem('')
        // }

  }

  const handleFinalStep = async () => {
    const response = await fetch('/api/librarian/setBorrowed', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
            readerId: reader,
            itemId: item,
            returnDate: returnDate
        })
    })
    const json = await response.json()
    console.log(json)
    if(response.ok){
        setError(null)
        setSuccess(true)
    }
    if(!response.ok){
        setError(json.error)
    }
}
const handleFinalStepReturn = async () => {
    const response = await fetch('/api/librarian/setReturned', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
            readerId: reader,
            itemId: item
        })
    })
    const json = await response.json()
    console.log(json)
    if(response.ok){
        setError(null)
        setSuccess(true)
    }
    if(!response.ok){
        setError(json.error)
    }
}
const handleThirdStep = async () => {
    const response = await fetch('/api/librarian/getReader/'+reader)
    const json = await response.json()
    console.log(json)
    if(response.ok){
        setError(null)
        setReaderi(json)
    }
    if(!response.ok){
        setError(json.error)
        setReader('')
    }
}

  return (
    <Box sx={{width:'100%', alignItems:'center', justifyContent:'center', display:'flex', mb: 5}}>
    <Box sx={{ width: '70%', paddingTop: '30px', paddingX: '60px' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          {success && lend && <Alert severity="success">Item successfully lent!</Alert>}
          {success && !lend && <Alert severity="success">Item successfully returned!</Alert>}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{minHeight: '300px', width: '100%', }}>
          {
                activeStep === 0 &&
                <Box sx={{width: '100%', alignItems:'center', 
                display: 'flex', flexDirection: 'column', pt: 2 
                }}>
                <Typography sx={{ mt: 2, mb: 1 }}>Please scan the item ID/ISBN or enter it manually</Typography>
                <TextField label="item ID" variant="outlined" 
                onChange={(e) => setItem(e.target.value)}
                required
                value={item}
                sx={{backgroundColor: 'white'}}
                />
                </Box>
            }
            {
                activeStep === 1 &&
                <Box sx={{width: '100%', alignItems:'center', 
                display: 'flex', flexDirection: 'column', pt: 2, 
                }}>
                <ToggleButtonGroup
                    value={lend}
                    exclusive
                    onChange={(e, newLend) => setLend(newLend)}
                    sx={{ width: '250px', pb: 2 }}
                    orientation="vertical"
                >
                    <ToggleButton value={true}>Lend</ToggleButton>
                    <ToggleButton value={false}>set Returned</ToggleButton>
                </ToggleButtonGroup>
                <Box sx={{width:'300px'}}>
                    { itemi && <ItemCard item={itemi}/> }
                </Box>
                </Box>
            }
            {
                activeStep === 2 && lend && 
                <Box sx={{width: '100%', alignItems:'center',
                display: 'flex', flexDirection: 'column', pt: 2,
                }}>
                <Typography sx={{ mt: 2, mb: 1 }}>Please enter the reader ID</Typography>
                <Stack spacing={2} width='300px'>
                <TextField label="reader ID" variant="outlined"
                onChange={(e) => setReader(e.target.value)}
                required
                value={reader}
                sx={{backgroundColor: 'white'}}
                />
                <TextField label="due date" variant="outlined" type="date"
                onChange={(e) => setReturnDate(e.target.value)}
                required
                value={returnDate}
                />
                </Stack>
                </Box>
            }
            {
                activeStep === 2 && !lend &&
                <Box sx={{width: '100%', alignItems:'center',
                display: 'flex', flexDirection: 'column', pt: 2,
                }}>
                    <Typography sx={{ mt: 2, mb: 1 }}>Please enter the reader ID</Typography>
                    <TextField label="reader ID" variant="outlined"
                onChange={(e) => setReader(e.target.value)}
                required
                value={reader}
                sx={{backgroundColor: 'white'}}
                />
                </Box>

            }
            {
                activeStep === 3 && itemi && readeri && 
                <Box sx={{width: '100%', alignItems:'center',
                display: 'flex', flexDirection: 'column', pt: 2,
                }}>
                    { lend ? 
                    <Typography sx={{ mt: 2, mb: 1 }}>Lending the below item to </Typography> : 
                    <Typography sx={{ mt: 2, mb: 1 }}>Setting the below item as returned by </Typography>
                    }
                    <Typography sx={{ mb: 1 }}>{readeri.name}</Typography>
                    <Box sx={{width:'300px'}}>
                    <ItemCard item={itemi}/>
                    </Box>
                </Box>
            }
            </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
    </Box>
  );
}

export default Lend