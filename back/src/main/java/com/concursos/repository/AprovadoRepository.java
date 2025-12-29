package com.concursos.repository;

import com.concursos.model.Aprovado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AprovadoRepository extends JpaRepository<Aprovado, Long> {
}