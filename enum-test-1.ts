namespace Ψ {
    enum Γ {α, β};
    enum Δ {α, β, δ};
    type Θ = {γ: Γ.α, δ: Δ.α | Δ.β};

    function isΘ(a: Δ): {γ: Γ.α, δ: typeof a} is Θ {
        return true;
    }
}