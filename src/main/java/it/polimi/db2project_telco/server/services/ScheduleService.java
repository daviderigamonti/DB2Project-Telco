package it.polimi.db2project_telco.server.services;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Stateless
public class ScheduleService {
    @PersistenceContext(unitName = "DB2Project")
    private EntityManager em;

    public ScheduleService() {}
}
