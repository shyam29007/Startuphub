import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Breadcrumb from "../../shared/Breadcrumb";

import ApplicationService from "../../../services/ApplicationService";

export default function ApplicationDetails() {

    const { id } = useParams();

    const [application, setApplication] =
        useState(null);

    async function loadApplication() {

        const data =
            await ApplicationService.getApplication(id);

        setApplication(data);

    }

    useEffect(() => {

        loadApplication();

    }, []);

    if (!application)
        return <h3>Loading...</h3>;

    return (

        <>
            <Breadcrumb />

            <div className="container py-5">

                <div className="card shadow">

                    <div className="card-body">

                        <h3>
                            {application.developerName}
                        </h3>

                        <p>
                            {application.developerEmail}
                        </p>

                        <hr />

                        <h5>Proposal</h5>

                        <p>
                            {application.proposal}
                        </p>

                        <h6>
                            Status :
                            {application.status}
                        </h6>

                    </div>

                </div>

            </div>

        </>

    );

}