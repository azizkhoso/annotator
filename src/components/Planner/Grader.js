import { useState } from "react";

import { Button, Grid, InputBase, Table, TableBody, TableCell, TableHead, TableRow, Typography, TableContainer, Paper } from "@material-ui/core";

import { Search, ArrowBack, PlayArrow } from "@material-ui/icons";

import infoIcon from '../../assets/info.svg';

import { useDispatch } from "react-redux";
import { setCurrentTab } from "../../redux/actions/plannerActions";

export default function GraderFromJob({grader}){
    const dispatch = useDispatch();
    let [voiceTypes, setVoiceTypes] = useState('usingOtherVoices');
    return (
        <Grid container direction="column" className="p-2 md:p-6 self-start">
            <Grid item>
                <Typography color="primary" className="font-bold text-sm md:text-2xl">Email: <span className="font-normal">{grader.email}</span></Typography>
            </Grid>
            <Grid item className="flex justify-end">
                <Button variant="contained" color="primary" size="small" startIcon={<ArrowBack />} onClick={()=>dispatch(setCurrentTab({name: 'graders', data: null}))}>Back</Button>
            </Grid>
            <Grid item className="flex justify-end mt-12">
                <select value={voiceTypes} onChange={(e)=>setVoiceTypes(e.target.value)} className="p-2 bg-gray-100 rounded-lg">
                    <option value="usingOtherVoices">Using other voices</option>
                    <option value="usingOwnVoices">Using own voices</option>
                </select>
            </Grid>
            <Grid item container className="mt-12 gap-2 flex-col lg:gap-60 md:flex-row">
                <Grid item className="flex-grow flex gap-2 items-center">
                    <div className="flex-grow flex bg-gray-100 px-2 rounded-lg gap-1 divide-x items-center">
                        <InputBase className="flex-grow w-20 px-2" placeholder="Type" />
                        <span className="rounded-r-lg pl-2">
                            <Search />
                        </span>
                    </div>
                </Grid>
                <Grid item className="flex-grow flex gap-2 items-center">
                    <div className="flex-grow flex items-center bg-gray-100 px-2 rounded-lg gap-1 divide-x">
                        <select className="bg-gray-100 w-12 md:w-auto rounded-l-lg">
                            <option value="equal">Equal</option>
                            <option value="greaterThan">Greater than</option>
                            <option value="lessThan">Less Than</option>
                        </select>
                        <InputBase className="flex-grow w-20" placeholder="Type" />
                        <span className="bg-gray-100 rounded-r-lg">
                            a-score
                        </span>
                    </div>
                    <span className="bg-pink-100 py-1 px-3 rounded-lg">
                        <Search />
                    </span>
                </Grid>
            </Grid>
            <Grid item className="mt-4">
                <TableContainer component={Paper} className="w-64 md:w-auto">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="border-black">Job ID</TableCell>
                                <TableCell className="border-black">Transcript</TableCell>
                                <TableCell className="border-black">
                                    <span className="flex">
                                        Heard
                                        <img src={infoIcon} alt="info" className="w-4" />
                                    </span>
                                </TableCell>
                                {   voiceTypes === 'usingOwnVoices' &&
                                    <TableCell className="border-black">
                                        <span className="flex">
                                            Said
                                            <img src={infoIcon} alt="info" className="w-4" />
                                        </span>
                                    </TableCell>
                                }
                                <TableCell className="border-black">
                                    <span className="flex">
                                        Matched
                                        <img src={infoIcon} alt="info" className="w-4" />
                                    </span>
                                </TableCell>
                                <TableCell className="border-black">
                                    <span className="flex">
                                        a-score
                                        <img src={infoIcon} alt="info" className="w-4" />
                                    </span>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            grader[voiceTypes].map((voiceType, index) => <>
                                <TableRow hover key={index} onClick={()=>{}}>
                                    <TableCell>{voiceType.jobId}</TableCell>
                                    <TableCell>{voiceType.transcript}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" size="small"><PlayArrow htmlColor="white" /></Button>
                                    </TableCell>
                                    {   voiceTypes === 'usingOwnVoices' &&
                                        <TableCell>
                                            <Button variant="contained" color="primary" size="small"><PlayArrow htmlColor="white" /></Button>
                                        </TableCell>
                                    }
                                    <TableCell>
                                        <Button variant="contained" color="primary" size="small"><PlayArrow htmlColor="white" /></Button>
                                    </TableCell>
                                    <TableCell>{voiceType.aScore}</TableCell>
                                </TableRow>
                            </>)
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}