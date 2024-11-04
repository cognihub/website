'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import FrontLobeSVG from './components/FrontalLobeSVG'
import CerebellumSVG from './components/CerebellumSVG'
import OccipitalLobeSVG from './components/OccipitalLobeSVG'
import ParietalLobeSVG from './components/ParietalLobeSVG'
import TemporalLobeSVG from './components/TemporalLobeSVG'
import CogniParticles from './components/CogniParticles'

import styles from './LandingScreen.module.css'

const GOALS_N_DETAILS = [
    {
        goal: 'Interdisciplinary thinking.',
        details: '',
    },
    {
        goal: 'Αναδεικνύουμε την διεπιστημονικότητα',
        details:
            'Αναδεικνύουμε τη διεπιστημονικότητα μεταξύ αντικειμένων όπως η Ψυχολογία, η Πληροφορική, η Βιολογία, η Γλωσσολογία, η Φιλοσοφία',
    },
    {
        goal: 'Απευθυνόμαστε σε ',
        details:
            'Απευθυνόμενοι σε φοιτητές σχετικών αντικειμένων με την Γνωσιακή Επιστήμη, όπως η Φιλοσοφία, η Βιολογία, η Πληροφορική, η Ψυχολογία και η Γλωσσολογία',
    },
    {
        goal: 'Συνδέουμε τους φοιτητές με την αγορά εργασίας',
        details:
            'Μέσω συζητήσεων, συνεντεύξεων και εξειδικευμένα events είτε με ανθρώπους που έχουν εμπειρία στη αγορά εργασίας, είτε με φοιτητές που κάνουν τα πρώτα τους βήματα',
    },
    {
        goal: 'Στοχεύουμε στην απόκτηση γνώσεων και δεξιοτήτων',
        details:
            'Μέσω δράσεων και σεμιναρίων, επιθυμούμε την απόκτηση ικανοτήτων που θα φανούν χρήσιμες τόσο στη καριέρα όσο και στη ακαδημαική ή ερευνητική πορεία των φοιτητών',
    },
    {
        goal: 'Επικοινωνούμε τη γνωσιακή επιστήμη',
        details:
            'Διοργανώνοντας συζητήσεις, παρουσιάσεις και συνεντεύξεις, με ειδικούς ή φοιτητές, σε θέματα που αφορούν το ευρύτερο φάσμα των επιστημών που εμπίπτουν στην γνωσιακή επιστήμη',
    },
]

export default function LandingPage() {
    const [currentGoal, setCurrentGoal] = useState(0)

    useEffect(() => {
        const brainPart = document.querySelector('#blinkable_part')
        brainPart.classList.add('BlinkIt')
    }, [])

    const onBrainPartEnter = (part) => {
        const brainPart = document.querySelector('#blinkable_part')
        brainPart.classList.remove('BlinkIt')
        setCurrentGoal(part)
    }

    const onBrainPartLeave = () => {
        setCurrentGoal(0)
    }

    return (
        <div className={styles.IntroductionContainer}>
            <div className={styles.GoalsAndBrainContainer}>
                <div className={styles.GoalsContainer}>
                    <div className={styles.GoalsText}>
                        <h1>{GOALS_N_DETAILS[currentGoal].goal}</h1>
                        <p>{GOALS_N_DETAILS[currentGoal].details}</p>
                    </div>
                </div>
                <div className={styles.BrainContainer}>
                    <div className={styles.Brain}>
                        <div
                            id='blinkable_part'
                            className={[
                                styles.BrainPart,
                                styles.FrontLobe,
                            ].join(' ')}
                            onMouseEnter={() => onBrainPartEnter(1)}
                            onMouseLeave={onBrainPartLeave}
                        >
                            <FrontLobeSVG />
                        </div>
                        <div
                            className={[
                                styles.BrainPart,
                                styles.Cerebellum,
                            ].join(' ')}
                            onMouseEnter={() => onBrainPartEnter(2)}
                            onMouseLeave={onBrainPartLeave}
                        >
                            <CerebellumSVG />
                        </div>
                        <div
                            className={[
                                styles.BrainPart,
                                styles.OccipitalLobe,
                            ].join(' ')}
                            onMouseEnter={() => onBrainPartEnter(3)}
                            onMouseLeave={onBrainPartLeave}
                        >
                            <OccipitalLobeSVG />
                        </div>
                        <div
                            className={[
                                styles.BrainPart,
                                styles.ParietalLobe,
                            ].join(' ')}
                            onMouseEnter={() => onBrainPartEnter(4)}
                            onMouseLeave={onBrainPartLeave}
                        >
                            <ParietalLobeSVG />
                        </div>
                        <div
                            className={[
                                styles.BrainPart,
                                styles.TemporalLobe,
                            ].join(' ')}
                            onMouseEnter={() => onBrainPartEnter(5)}
                            onMouseLeave={onBrainPartLeave}
                        >
                            <TemporalLobeSVG />
                        </div>
                    </div>
                </div>
            </div>
            <Link href='/aboutus'>Μάθετε Περισσότερα ⟶</Link>
            <CogniParticles />
        </div>
    )
}
