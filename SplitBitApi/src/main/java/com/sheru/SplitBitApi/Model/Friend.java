package com.sheru.SplitBitApi.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Friend {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String friendId;
    private String name;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User owner;
}
