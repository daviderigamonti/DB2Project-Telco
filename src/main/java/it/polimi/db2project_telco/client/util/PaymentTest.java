package it.polimi.db2project_telco.client.util;

public enum PaymentTest {
    SUCCESS(1),
    RANDOM(0),
    FAILURE(-1);

    private final int value;

    PaymentTest(int value) {
        this.value = value;
    }

    public int value() {
        return this.value;
    }
}
