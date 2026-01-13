package _Self.buildTypes

import jetbrains.buildServer.configs.kotlin.*
import jetbrains.buildServer.configs.kotlin.buildFeatures.perfmon
import jetbrains.buildServer.configs.kotlin.buildSteps.NodeJSBuildStep
import jetbrains.buildServer.configs.kotlin.buildSteps.nodeJS
import jetbrains.buildServer.configs.kotlin.triggers.schedule
import jetbrains.buildServer.configs.kotlin.triggers.vcs

object Build : BuildType({
    name = "API"

    params {
        param("env.REPORT_PASSWORD", "Qwe123456")
        param("env.URL", "https://rp.epam.com/")
        param("env.API_TOKEN", "rpPersonalApiKey_blfFd0Y_QQumgVuDGCFl6OWoZKd7Ed8JGESyVNTFp1-SGubfBhwBYZQUAuVTUZUG")
        param("env.API_ENDPOINT", "https://rp.epam.com/api/v1")
        param("env.ENV", "prod")
        param("env.REPORT_USERNAME", "hayk.margaryan87gmail.com")
    }

    vcs {
        root(HttpsGithubComHaykmargarTafFromScratchRefsHeadsDevelop)
    }

    steps {
        nodeJS {
            id = "nodejs_runner"
            shellScript = "npm ci"
            dockerImagePlatform = NodeJSBuildStep.ImagePlatform.Any
        }
        nodeJS {
            name = "Run API Tests"
            id = "Run_Playwright_tests"
            shellScript = "npm run api:playwright"
            dockerImagePlatform = NodeJSBuildStep.ImagePlatform.Any
        }
    }

    triggers {
        vcs {
        }
        schedule {
            triggerBuild = always()
        }
    }

    features {
        perfmon {
        }
    }

    requirements {
        exists("teamcity.agent.jvm.os.name")
    }
})
