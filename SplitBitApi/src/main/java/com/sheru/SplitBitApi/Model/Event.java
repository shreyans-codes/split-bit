package com.sheru.SplitBitApi.Model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Event {
    @Id
    @GeneratedValue
    private String eventId;
    private String name;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User owner;
    private Float amount;
}
