import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { useCallback } from 'react'
import { useNumberOfParticles } from '../hooks'

import particlesConfig from './particles-config.json'

function CogniParticles() {
    const noParticles = useNumberOfParticles()

    particlesConfig.particles.number.value = noParticles

    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine)
    }, [noParticles])

    return (
        <Particles
            id='tsparticles'
            init={particlesInit}
            options={particlesConfig}
        />
    )
}

export default CogniParticles
