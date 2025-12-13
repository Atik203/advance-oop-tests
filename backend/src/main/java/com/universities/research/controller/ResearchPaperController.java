package com.universities.research.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universities.research.model.ResearchPaper;
import com.universities.research.service.ResearchPaperService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/research-papers")
@RequiredArgsConstructor
public class ResearchPaperController {
    private final ResearchPaperService service;

    @GetMapping
    public ResponseEntity<List<ResearchPaper>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResearchPaper> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ResearchPaper> create(@RequestBody ResearchPaper paper) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(paper));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResearchPaper> update(@PathVariable Long id, @RequestBody ResearchPaper paper) {
        return ResponseEntity.ok(service.update(id, paper));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ResearchPaper> partialUpdate(@PathVariable Long id, @RequestBody ResearchPaper paper) {
        return ResponseEntity.ok(service.partialUpdate(id, paper));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
