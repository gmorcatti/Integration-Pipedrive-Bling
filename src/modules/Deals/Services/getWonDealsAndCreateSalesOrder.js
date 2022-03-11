class GetAllWonDealsThatWasNotIntegrated {
    constructor({ pipeDriveRepository, blingRepository }) {
        this.pipeDriveRepository = pipeDriveRepository;
        this.blingRepository = blingRepository;
    }

    /* This method get All Won Deals that wasn't integrated yet and create a Sales Order in Bling.
        After this it callback to Pipedrive updating the "Bling Integrated" Custom fields to the value "Sim".
        This Custom field is used to know if a Deal has already been integrated or not.
    */
    async handle() {
        const wonDeals = await this.pipeDriveRepository.getAllWonDealsThatWasNotIntegrated();

        console.log(`There's ${wonDeals?.length || 0} won deal(s) to integrate`);

        if(!wonDeals) return

        for (let deal of wonDeals) {
            try {
                console.log(`Deal ${deal.id} | Start Integration`)

                const dealInfo = this.getDealJsonInfo(deal);

                await this.blingRepository.createSalesOrder(dealInfo)

                console.log(`Deal ${deal.id} | Created Sales Order Successfully`)

                const dealId = deal.id

                const updatePipeDriveDealRequest = await this.pipeDriveRepository.updateDealIntegrationDetail({
                    dealId,
                    value: "Sim"
                });

                if(!updatePipeDriveDealRequest.success) {
                    const maxAttempts = 5;
                    let secureCount = 0;
                    let hasSuccess = false;
                    while(secureCount < maxAttempts && !hasSuccess) {
                        const newAttempt = await this.pipeDriveRepository.updateDealIntegrationDetail({
                            dealId,
                            value: "Sim"
                        });
                        hasSuccess = newAttempt.success
                        secureCount++;
                        
                        if(secureCount >= maxAttempts) informPipeDriveCallbackIntegrationError({
                            maxAttempts,
                            dealId,
                            dealName: deal.title,
                        })
                    }
                }

                console.log(`Deal ${deal.id} | All Integrate Runned Successfully`)

            } catch (error) {
                if(error.isAxiosError) {
                    console.error(
                        'An Axios Error ocurred while use case "GetAllWonDealsThatWasNotIntegrated" was running',
                        error.response.data
                    );
                } else {
                    console.error(
                        'An Api Error ocurred while use case "GetAllWonDealsThatWasNotIntegrated" was running',
                        error
                    );
                }
            }
        }
    }

    getDealJsonInfo(deal) {
        return {
            pedido: {
                cliente: {
                    id: deal.org_id.value,
                    nome: deal.org_id.name,
                    endereco: deal.org_id.address || '',
                },
                itens: [{
                    item: {
                        codigo: deal.id,
                        descricao: deal.title,
                        un: 'Projeto',
                        qtde: '1',
                        vlr_unit: deal.value,
                    }
                }],
                obs: `Integração realizada via API em: ${new Date().toLocaleString()}`,
            }
        }
    }

    informPipeDriveCallbackIntegrationError({ maxAttempts, dealId, dealName }) {
        const errorMsg = `Error after ${maxAttempts} attemps to update Custom Field "Bling Integrated" from Deal with ID = "${dealId}" and Name = "${dealName}"`;
        throw new Error(errorMsg);
    }
}

export default GetAllWonDealsThatWasNotIntegrated