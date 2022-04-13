package it.polimi.db2project_telco.client.util;

import it.polimi.db2project_telco.server.exceptions.PaymentException;

import java.util.Random;

public final class PaymentService {

    public static boolean paymentOperation(PaymentTest test, int maxDuration) throws PaymentException {
        Random r = new Random();
        boolean outcome;

        switch(test) {
            case FAILURE:
                outcome = false;
                break;
            case SUCCESS:
                outcome = true;
                break;
            case RANDOM:
                outcome = r.nextBoolean();
                break;
            default:
                throw new PaymentException("Invalid parameters in payment");
        }

        if(maxDuration < 0)
            maxDuration = 0;

        try {
            Thread.sleep(r.nextInt(maxDuration + 1));
        } catch(InterruptedException e) {
            throw new PaymentException("Payment interrupted");
        }

        return outcome;
    }

}